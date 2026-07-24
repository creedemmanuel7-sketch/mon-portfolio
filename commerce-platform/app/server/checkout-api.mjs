import Stripe from 'stripe'
import http from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  for (const name of ['.env.local', '.env']) {
    const p = resolve(root, name)
    if (!existsSync(p)) continue
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (!m) continue
      const key = m[1].trim()
      const val = m[2].trim()
      if (!process.env[key]) process.env[key] = val
    }
  }
}

loadEnv()

// Secret serveur uniquement — jamais VITE_ (Vite expose tout VITE_* au navigateur).
// Fallback VITE_STRIPE_SECRET_KEY pour les .env.local mal nommés (à corriger).
const secret = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY
if (process.env.VITE_STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY) {
  console.warn(
    '[sika] Renomme VITE_STRIPE_SECRET_KEY → STRIPE_SECRET_KEY dans .env.local (la clé secrète ne doit pas être VITE_).',
  )
}
if (!secret || !secret.startsWith('sk_')) {
  console.error('STRIPE_SECRET_KEY manquante dans .env.local (pas VITE_STRIPE_SECRET_KEY)')
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
