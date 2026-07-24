import Stripe from 'stripe'
import http from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function stripQuotes(val) {
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    return val.slice(1, -1)
  }
  return val
}

function decodeEnvBuffer(buf) {
  // UTF-16 LE BOM
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) {
    return buf.toString('utf16le').replace(/^\uFEFF/, '')
  }
  // UTF-16 BE BOM
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    const swapped = Buffer.alloc(buf.length - 2)
    for (let i = 2; i + 1 < buf.length; i += 2) {
      swapped[i - 2] = buf[i + 1]
      swapped[i - 1] = buf[i]
    }
    return swapped.toString('utf16le')
  }
  // UTF-8 with BOM
  let text = buf.toString('utf8')
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1)
  // UTF-16 sans BOM (beaucoup de null bytes)
  if (text.includes('\u0000')) {
    text = buf.toString('utf16le').replace(/^\uFEFF/, '')
  }
  return text
}

function parseEnvText(text) {
  const found = []
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim().replace(/^\uFEFF/, '')
    const val = stripQuotes(trimmed.slice(eq + 1).trim())
    if (!key) continue
    found.push(key)
    // .env.local doit toujours gagner (évite une var Windows/conda vide ou incorrecte)
    process.env[key] = val
  }
  return found
}

function loadEnv() {
  const loaded = []
  // .env d'abord, puis .env.local qui écrase
  for (const name of ['.env', '.env.local']) {
    const p = resolve(root, name)
    if (!existsSync(p)) continue
    const text = decodeEnvBuffer(readFileSync(p))
    const keys = parseEnvText(text)
    loaded.push({ path: p, keys })
  }
  return loaded
}

const loadedFiles = loadEnv()

// Secret serveur uniquement — jamais VITE_ (Vite expose tout VITE_* au navigateur).
const secret = (process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY || '').trim()
if (process.env.VITE_STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY) {
  console.warn(
    '[sika] Renomme VITE_STRIPE_SECRET_KEY → STRIPE_SECRET_KEY dans .env.local (la clé secrète ne doit pas être VITE_).',
  )
}
if (!secret || !secret.startsWith('sk_')) {
  console.error('STRIPE_SECRET_KEY manquante ou invalide.')
  console.error('Dossier attendu :', root)
  if (!loadedFiles.length) {
    console.error('Aucun fichier .env.local / .env trouvé à cet emplacement.')
    console.error('Crée :', resolve(root, '.env.local'))
  } else {
    for (const f of loadedFiles) {
      console.error(`Fichier lu : ${f.path}`)
      console.error(`  Clés trouvées : ${f.keys.length ? f.keys.join(', ') : '(aucune — encodage ?)'}`)
    }
    const hasStripe = loadedFiles.some((f) => f.keys.includes('STRIPE_SECRET_KEY'))
    if (hasStripe && secret) {
      console.error('La clé est présente mais ne commence pas par sk_ (guillemets / espaces ?).')
    } else if (!hasStripe) {
      console.error('Ajoute une ligne exacte (sans guillemets) :')
      console.error('STRIPE_SECRET_KEY=sk_test_...')
    }
  }
  process.exit(1)
}

const stripe = new Stripe(secret)
const PORT = Number(process.env.CHECKOUT_API_PORT || 8787)

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const server = http.createServer(async (req, res) => {
  cors(res)
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/api/create-checkout') {
    try {
      const chunks = []
      for await (const c of req) chunks.push(c)
      const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
      const { items, customer, successUrl, cancelUrl } = body

      if (!Array.isArray(items) || !items.length) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Panier vide' }))
        return
      }

      const line_items = items.map((item) => ({
        quantity: item.qty,
        price_data: {
          currency: 'xof',
          unit_amount: item.price,
          product_data: {
            name: item.name,
            description: item.desc?.slice(0, 200) || undefined,
            images: item.image ? [item.image] : undefined,
          },
        },
      }))

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items,
        success_url: successUrl || 'http://127.0.0.1:5173/#/confirmation?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: cancelUrl || 'http://127.0.0.1:5173/#/panier',
        customer_email: customer?.email || undefined,
        metadata: {
          customer_name: customer?.name || '',
          city: customer?.city || '',
          address: customer?.address || '',
        },
        locale: 'fr',
      })

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ id: session.id, url: session.url }))
    } catch (err) {
      console.error(err)
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: err.message || 'Erreur Stripe' }))
    }
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[Atelier Sika] Stripe checkout API → http://127.0.0.1:${PORT}/api/create-checkout`)
})
