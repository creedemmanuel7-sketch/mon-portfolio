/** Diagnostic rapide : node scripts/check-env.mjs */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const p = resolve(root, '.env.local')
console.log('root =', root)
console.log('file =', p)
console.log('exists =', existsSync(p))
if (!existsSync(p)) process.exit(1)

const buf = readFileSync(p)
console.log('bytes =', buf.length, 'bom?', buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf)
const text = buf.toString('utf8').replace(/^\uFEFF/, '')
const lines = text.split(/\r?\n/)
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (!line.includes('STRIPE') && !line.includes('SUPABASE_URL')) continue
  const eq = line.indexOf('=')
  const key = eq > 0 ? line.slice(0, eq).trim() : '(no =)'
  const val = eq > 0 ? line.slice(eq + 1).trim() : line
  console.log(`L${i + 1}: key=${JSON.stringify(key)} valStarts=${JSON.stringify(val.slice(0, 12))} len=${val.length}`)
}

const m = text.match(/^STRIPE_SECRET_KEY=(.*)$/m)
console.log('regex STRIPE_SECRET_KEY =', m ? `ok starts sk_=${m[1].trim().startsWith('sk_')}` : 'NOT FOUND')
console.log('process.env.STRIPE_SECRET_KEY before load =', JSON.stringify(process.env.STRIPE_SECRET_KEY ?? null))
