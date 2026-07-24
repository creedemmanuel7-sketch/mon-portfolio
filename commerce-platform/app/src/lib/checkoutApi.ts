/** Résout l’URL de l’API Checkout selon l’environnement. */
export function resolveCheckoutApiUrl(): string {
  const fromEnv = String(import.meta.env.VITE_CHECKOUT_API_URL || '').trim()
  const host = typeof window !== 'undefined' ? window.location.hostname : ''
  const isLocal = host === 'localhost' || host === '127.0.0.1'

  if (fromEnv) {
    const pointsLocal = /127\.0\.0\.1|localhost/.test(fromEnv)
    // Ne jamais appeler 127.0.0.1 depuis GitHub Pages / Netlify
    if (!pointsLocal || isLocal) return fromEnv
  }

  if (isLocal) return 'http://127.0.0.1:8787/api/create-checkout'
  // Netlify Functions (path déclaré dans create-checkout.ts)
  return '/api/create-checkout'
}
