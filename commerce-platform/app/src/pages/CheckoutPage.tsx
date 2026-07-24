import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart'
import { resolveCheckoutApiUrl } from '../lib/checkoutApi'
import { useToast } from '../toast'
import { imgUrl, money } from '../types'

export function CheckoutPage() {
  const { cart, getProduct, cartTotal } = useCart()
  const navigate = useNavigate()
  const { push } = useToast()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: 'Lomé',
  })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!cart.length) {
      setError('Votre panier est vide.')
      push('Votre panier est vide.', 'error')
      return
    }
    setBusy(true)

    const origin = window.location.href.split('#')[0].replace(/\/$/, '')
    const lineItems = cart
      .map((row) => {
        const p = getProduct(row.id)
        if (!p) return null
        return { id: p.id, name: p.name, qty: row.qty, price: p.price }
      })
      .filter(Boolean)

    sessionStorage.setItem(
      'sika_checkout_draft',
      JSON.stringify({
        ...form,
        email: form.email.trim().toLowerCase(),
        totalCents: cartTotal,
        items: lineItems,
      }),
    )

    const items = cart
      .map((row) => {
        const p = getProduct(row.id)
        if (!p) return null
        const imagePath = imgUrl(p.img)
        const absoluteImage = imagePath.startsWith('http')
          ? imagePath
          : `${origin}/${imagePath.replace(/^\.\//, '')}`
        return {
          qty: row.qty,
          price: p.price,
          name: p.name,
          desc: p.desc,
          image: absoluteImage,
        }
      })
      .filter(Boolean)

    const api = resolveCheckoutApiUrl()
    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: form,
          successUrl: `${origin}/#/confirmation?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/#/panier`,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Impossible de créer la session Stripe')
      }
      push('Redirection vers Stripe…', 'info')
      window.location.href = data.url
    } catch (err) {
      setBusy(false)
      const localHint = /127\.0\.0\.1|localhost/.test(api)
        ? ' — Lancez l’API locale : npm run stripe:api'
        : ' — Ou utilisez « Simuler succès » (GitHub Pages n’héberge pas Stripe).'
      const msg = err instanceof Error ? `${err.message}${localHint}` : 'Erreur paiement'
      setError(msg)
      push(msg, 'error')
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-sand bg-chalk p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-copper">Paiement sécurisé</p>
        <h1 className="font-display text-3xl font-bold">Checkout</h1>
        <p className="text-sm text-muted">
          Carte test Stripe : <code className="rounded bg-sand px-1">4242 4242 4242 4242</code> · n’importe quelle date future · CVC 123
        </p>
        <label className="block text-sm font-bold">
          Nom
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-sand px-3 py-2"
            placeholder="Amina Mensah"
          />
        </label>
        <label className="block text-sm font-bold">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-xl border border-sand px-3 py-2"
            placeholder="amina@email.com"
          />
        </label>
        <label className="block text-sm font-bold">
          Adresse
          <input
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full rounded-xl border border-sand px-3 py-2"
            placeholder="Quartier, rue…"
          />
        </label>
        <label className="block text-sm font-bold">
          Ville
          <input
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="mt-1 w-full rounded-xl border border-sand px-3 py-2"
          />
        </label>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div>
        )}
        <button
          disabled={busy || !cart.length}
          type="submit"
          className="rounded-full bg-copper px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          {busy ? 'Redirection Stripe…' : 'Payer avec Stripe'}
        </button>
        <Link to="/panier" className="ml-3 text-sm font-bold text-muted">
          Retour panier
        </Link>
        <button
          type="button"
          className="mt-2 block text-xs text-muted underline"
          onClick={() => {
            if (!form.email.trim() || !form.name.trim()) {
              push('Renseignez au moins nom et email pour la simulation.', 'error')
              return
            }
            const lineItems = cart
              .map((row) => {
                const p = getProduct(row.id)
                if (!p) return null
                return { id: p.id, name: p.name, qty: row.qty, price: p.price }
              })
              .filter(Boolean)
            sessionStorage.setItem(
              'sika_checkout_draft',
              JSON.stringify({
                ...form,
                email: form.email.trim().toLowerCase() || 'demo@atelier-sika.demo',
                totalCents: cartTotal,
                items: lineItems,
              }),
            )
            push('Paiement simulé — enregistrement de la commande…', 'info')
            navigate('/confirmation?simulated=1')
          }}
        >
          Simuler succès (sans Stripe)
        </button>
      </form>
      <aside className="h-fit rounded-2xl border border-sand bg-chalk p-5">
        <h2 className="font-bold">Votre sélection Sika</h2>
        <p className="mt-1 text-sm text-muted">Peu d’objets. Beaucoup de présence.</p>
        {cart.map((row) => {
          const p = getProduct(row.id)
          if (!p) return null
          return (
            <div key={row.id} className="mt-3 flex justify-between text-sm">
              <span>
                {row.qty}× {p.name}
              </span>
              <span>{money(p.price * row.qty)}</span>
            </div>
          )
        })}
        <div className="mt-4 flex justify-between border-t border-sand pt-3 font-bold">
          <span>Total</span>
          <span>{money(cartTotal)}</span>
        </div>
      </aside>
    </div>
  )
}
