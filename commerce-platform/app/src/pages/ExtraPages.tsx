import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart'
import { money } from '../types'

export function CheckoutPage() {
  const { cart, getProduct, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    // Étape 3b : Stripe Checkout Session. Simulation pour l’instant.
    window.setTimeout(() => {
      clearCart()
      navigate('/confirmation')
    }, 600)
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-sand bg-chalk p-5">
        <h1 className="font-display text-3xl font-bold">Checkout</h1>
        <p className="text-sm text-muted">Stripe réel à brancher (clés dans `.env`). Simulation active.</p>
        <label className="block text-sm font-bold">Nom<input required className="mt-1 w-full rounded-xl border border-sand px-3 py-2" /></label>
        <label className="block text-sm font-bold">Email<input required type="email" className="mt-1 w-full rounded-xl border border-sand px-3 py-2" /></label>
        <label className="block text-sm font-bold">Adresse<input required className="mt-1 w-full rounded-xl border border-sand px-3 py-2" /></label>
        <label className="block text-sm font-bold">Ville<input required defaultValue="Lomé" className="mt-1 w-full rounded-xl border border-sand px-3 py-2" /></label>
        <button disabled={busy || !cart.length} type="submit" className="rounded-full bg-copper px-6 py-3 text-sm font-bold text-white disabled:opacity-50">
          {busy ? 'Paiement…' : 'Payer (simulation Stripe)'}
        </button>
        <Link to="/panier" className="ml-3 text-sm font-bold text-muted">Retour panier</Link>
      </form>
      <aside className="h-fit rounded-2xl border border-sand bg-chalk p-5">
        <h2 className="font-bold">Commande</h2>
        {cart.map((row) => {
          const p = getProduct(row.id)
          if (!p) return null
          return (
            <div key={row.id} className="mt-2 flex justify-between text-sm">
              <span>{row.qty}× {p.name}</span>
              <span>{money(p.price * row.qty)}</span>
            </div>
          )
        })}
        <div className="mt-4 flex justify-between border-t border-sand pt-3 font-bold">
          <span>Total</span><span>{money(cartTotal)}</span>
        </div>
      </aside>
    </div>
  )
}

export function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Merci</p>
      <h1 className="font-display mt-2 text-4xl font-bold">Commande confirmée</h1>
      <p className="mt-3 text-muted">N° ASK-2026-1042 · statut paid (démo)</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/commandes" className="rounded-full bg-copper px-5 py-3 text-sm font-bold text-white">Mes commandes</Link>
        <Link to="/boutique" className="rounded-full border border-ink px-5 py-3 text-sm font-bold">Boutique</Link>
      </div>
    </div>
  )
}

export function WishPage() {
  const { wish, products } = useCart()
  const list = products.filter((p) => wish.includes(p.id))
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Favoris</h1>
      {!list.length ? (
        <p className="mt-4 text-muted">Aucun favori. <Link className="text-copper font-bold" to="/boutique">Parcourir</Link></p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {list.map((p) => (
            <Link key={p.id} to={`/produit/${p.id}`} className="rounded-2xl border border-sand bg-chalk p-3 font-bold">{p.name}</Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:items-center">
      <img src="./assets/brand/about-boutique.jpg" alt="" className="rounded-3xl object-cover min-h-[280px]" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Marque cliente</p>
        <h1 className="font-display mt-2 text-4xl font-bold">À propos d’Atelier Sika</h1>
        <p className="mt-4 text-muted">
          Maison lifestyle contemporaine d’Afrique de l’Ouest — indigo, cuivre, matières honnêtes. Projet e-commerce démo portfolio (pas une marque personnelle).
        </p>
      </div>
    </div>
  )
}

export function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Contact</h1>
      <form
        className="mt-6 space-y-3 rounded-2xl border border-sand bg-chalk p-5"
        onSubmit={(e) => {
          e.preventDefault()
          alert('Message envoyé (démo)')
        }}
      >
        <input required placeholder="Nom" className="w-full rounded-xl border border-sand px-3 py-2" />
        <input required type="email" placeholder="Email" className="w-full rounded-xl border border-sand px-3 py-2" />
        <textarea required rows={4} placeholder="Message" className="w-full rounded-xl border border-sand px-3 py-2" />
        <button type="submit" className="rounded-full bg-indigo px-5 py-3 text-sm font-bold text-white">Envoyer</button>
      </form>
    </div>
  )
}

export function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Mes commandes</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-sand bg-chalk">
        <div className="grid grid-cols-4 gap-2 border-b border-sand px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <span>N°</span><span>Date</span><span>Total</span><span>Statut</span>
        </div>
        <div className="grid grid-cols-4 gap-2 px-4 py-3 text-sm">
          <span>ASK-2026-1042</span><span>24/07/2026</span><span>35 000 XOF</span><span className="font-bold text-emerald-700">paid</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">Persistance Supabase + Stripe webhook = prochaine sous-étape.</p>
    </div>
  )
}
