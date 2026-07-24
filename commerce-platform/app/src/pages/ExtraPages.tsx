import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'
import { sendContactMessage } from '../lib/contact'
import { fetchOrdersByEmail, savePaidOrder, type OrderRow } from '../lib/orders'
import { useToast } from '../toast'
import { money } from '../types'
import { supabaseConfigured } from '../lib/supabase'

export { CheckoutPage } from './CheckoutPage'

export function ConfirmationPage() {
  const { clearCart } = useCart()
  const [saveMsg, setSaveMsg] = useState('Enregistrement de la commande…')
  const [savedOk, setSavedOk] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    async function persist() {
      const raw = sessionStorage.getItem('sika_checkout_draft')
      const params = new URLSearchParams(window.location.hash.split('?')[1] || window.location.search.replace(/^\?/, ''))
      const session = params.get('session_id')

      if (!raw) {
        if (!cancelled) {
          setSaveMsg(supabaseConfigured ? 'Commande confirmée.' : 'Stripe OK — Supabase non configuré.')
          setSavedOk(true)
        }
        clearCart()
        return
      }

      try {
        const draft = JSON.parse(raw) as {
          email: string
          name?: string
          address?: string
          city?: string
          totalCents: number
          items: { id: string; name: string; qty: number; price: number }[]
        }
        const result = await savePaidOrder({
          email: draft.email,
          customerName: draft.name,
          address: draft.address,
          city: draft.city,
          totalCents: draft.totalCents,
          items: draft.items,
          stripeSessionId: session,
        })
        if (!cancelled) {
          setSavedOk(result.ok)
          setSaveMsg(
            result.ok
              ? `Commande enregistrée · ${result.id.slice(0, 8)}…`
              : `Paiement OK, enregistrement Supabase : ${result.error}`,
          )
        }
        if (result.ok) sessionStorage.removeItem('sika_checkout_draft')
        if (draft.email) localStorage.setItem('sika_last_email', draft.email)
      } catch {
        if (!cancelled) {
          setSavedOk(false)
          setSaveMsg('Commande confirmée (brouillon local).')
        }
      }
      clearCart()
    }
    void persist()
    return () => {
      cancelled = true
    }
  }, [clearCart])

  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const session = params.get('session_id')
  const simulated = params.get('simulated') === '1'

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Merci</p>
      <h1 className="font-display mt-2 text-4xl font-bold">Votre commande est confirmée</h1>
      <p className="mt-3 text-muted">Bienvenue dans la maison Sika.</p>
      <p
        className={`mt-4 text-sm ${
          savedOk === false ? 'text-amber-800' : savedOk === true ? 'text-emerald-800' : 'text-muted'
        }`}
      >
        {saveMsg}
      </p>
      <p className="mt-2 text-sm text-muted">
        Statut · <span className="font-bold text-emerald-700">paid</span>
        {simulated ? ' · simulation' : null}
        {session ? <><br /><span className="text-xs break-all">Session {session}</span></> : null}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/commandes" className="rounded-full bg-copper px-5 py-3 text-sm font-bold text-white">Mes commandes</Link>
        <Link to="/boutique" className="rounded-full border border-ink px-5 py-3 text-sm font-bold">Continuer la visite</Link>
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
      <p className="mt-2 text-muted">Les pièces que vous gardez sous la main.</p>
      {!list.length ? (
        <p className="mt-4 text-muted">Aucun favori pour l’instant. <Link className="font-bold text-copper" to="/boutique">Parcourir la boutique</Link></p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Maison</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
        Une adresse pour des objets qui tiennent leur promesse.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Atelier Sika est née d’une conviction simple : le quotidien mérite mieux que l’accumulation.
        Nous sélectionnons des pièces sobres — indigo, cuivre, terre, lin — pour habiter Lomé et ailleurs avec intention.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
        <img src="./assets/brand/about-boutique.jpg" alt="Intérieur Atelier Sika" className="min-h-[300px] rounded-3xl object-cover" />
        <div className="space-y-4 text-muted">
          <p>
            <strong className="text-ink">Sika</strong> évoque l’or en akan : non pas le luxe bruyant, mais la valeur juste.
            Une matière honnête. Un geste précis. Une durée.
          </p>
          <p>
            Entre artisanat ouest-africain et design contemporain, chaque objet a un usage clair :
            éclairer un coin lecture, porter la journée, dresser une table sans effort.
          </p>
          <p>
            Cette boutique est une <strong className="text-ink">marque cliente démo</strong> pour le portfolio —
            un terrain réel de e-commerce, paiement et data.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ['Matière', 'Indigo, lin, grès, cuivre, raffia — des textures qui vieillissent bien.'],
          ['Geste', 'Préparer, allumer, porter, ranger. Le beau dans l’utile.'],
          ['Lieu', 'Bureau, salon, seuil, voyage. Des objets qui voyagent avec vous.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-sand bg-chalk p-5">
            <h3 className="font-display text-xl font-bold text-ink">{t}</h3>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-indigo px-6 py-10 text-white md:px-10">
        <h2 className="font-display text-3xl font-bold">Peu d’objets. Beaucoup de présence.</h2>
        <p className="mt-3 max-w-xl text-white/80">
          Rejoignez l’esprit Sika : une sélection courte, des textes clairs, un paiement sécurisé.
        </p>
        <Link to="/boutique" className="mt-6 inline-block rounded-full bg-copper px-6 py-3 text-sm font-bold text-white">
          Explorer les 40 pièces
        </Link>
      </div>
    </div>
  )
}

export function ContactPage() {
  const { push } = useToast()
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    reason: 'commande',
    message: '',
  })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    const result = await sendContactMessage({
      source: 'atelier-sika',
      name: form.name,
      email: form.email,
      reason: form.reason,
      message: form.message,
    })
    setBusy(false)
    if (!result.ok) {
      push(result.error, 'error')
      return
    }
    push('Message envoyé — nous vous répondrons bientôt.', 'success')
    setForm({ name: '', email: '', reason: 'commande', message: '' })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Écrire à l’atelier</p>
          <h1 className="font-display mt-2 text-4xl font-bold">Parlons de votre prochaine pièce</h1>
          <p className="mt-4 text-muted">
            Une question sur une matière, une commande, une collaboration ?
            Choisissez le motif — le message est enregistré et consultable côté atelier.
          </p>
          <div className="mt-8 space-y-2 text-sm">
            <p><strong>Email</strong> · hello@atelier-sika.demo</p>
            <p><strong>Tél.</strong> · +228 00 00 00 00</p>
            <p><strong>Adresse</strong> · Lomé, Togo (showroom fictionnel)</p>
            <p className="text-muted">Lun–Sam · 9h–18h</p>
          </div>
        </div>
        <form className="space-y-3 rounded-2xl border border-sand bg-chalk p-5" onSubmit={onSubmit}>
          <input
            required
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Votre nom"
            className="w-full rounded-xl border border-sand px-3 py-2"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full rounded-xl border border-sand px-3 py-2"
          />
          <label className="block text-sm font-bold">
            Motif
            <select
              name="reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="mt-1 w-full rounded-xl border border-sand px-3 py-2 font-normal"
            >
              <option value="commande">Suivi de commande</option>
              <option value="produit">Question produit</option>
              <option value="presse">Presse / partenariat</option>
              <option value="autre">Autre</option>
            </select>
          </label>
          <textarea
            required
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Votre message"
            className="w-full rounded-xl border border-sand px-3 py-2"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-indigo px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {busy ? 'Envoi…' : 'Envoyer le message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export function OrdersPage() {
  const [email, setEmail] = useState(() => localStorage.getItem('sika_last_email') || '')
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function load(e?: FormEvent) {
    e?.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetchOrdersByEmail(email)
    setLoading(false)
    if (!res.ok) {
      setOrders([])
      setError(res.error)
      return
    }
    setOrders(res.orders)
    if (email) localStorage.setItem('sika_last_email', email.trim().toLowerCase())
  }

  useEffect(() => {
    if (email) void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Mes commandes</h1>
      <p className="mt-2 text-muted">
        {supabaseConfigured
          ? 'Retrouvez vos commandes avec l’email utilisé au checkout.'
          : 'Configure VITE_SUPABASE_URL + ANON_KEY, puis exécute supabase/orders.sql.'}
      </p>
      <form onSubmit={load} className="mt-6 flex flex-wrap gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="vous@email.com"
          className="min-w-[220px] flex-1 rounded-full border border-sand bg-chalk px-4 py-2"
        />
        <button type="submit" className="rounded-full bg-indigo px-5 py-2 text-sm font-bold text-white">
          {loading ? '…' : 'Rechercher'}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6 overflow-hidden rounded-2xl border border-sand bg-chalk">
        <div className="grid grid-cols-4 gap-2 border-b border-sand px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <span>N°</span><span>Date</span><span>Total</span><span>Statut</span>
        </div>
        {!orders.length ? (
          <p className="px-4 py-6 text-sm text-muted">Aucune commande pour cet email.</p>
        ) : (
          orders.map((o) => (
            <div key={o.id} className="grid grid-cols-4 gap-2 border-b border-sand px-4 py-3 text-sm last:border-0">
              <span className="truncate font-mono text-xs">{o.id.slice(0, 8)}</span>
              <span>{new Date(o.created_at).toLocaleDateString('fr-FR')}</span>
              <span>{money(o.total_cents)}</span>
              <span className="font-bold text-emerald-700">{o.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

