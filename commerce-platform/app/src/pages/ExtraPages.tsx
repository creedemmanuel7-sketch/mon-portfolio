import { type FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'

export { CheckoutPage } from './CheckoutPage'

export function ConfirmationPage() {
  const { clearCart } = useCart()
  useEffect(() => {
    clearCart()
  }, [clearCart])

  const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
  const session = params.get('session_id')

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Merci</p>
      <h1 className="font-display mt-2 text-4xl font-bold">Votre commande est confirmée</h1>
      <p className="mt-3 text-muted">
        Bienvenue dans la maison Sika. Un email de confirmation suivra dès que Supabase / webhooks seront branchés.
      </p>
      <p className="mt-2 text-sm text-muted">
        Statut · <span className="font-bold text-emerald-700">paid</span> (Stripe test)
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
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Écrire à l’atelier</p>
          <h1 className="font-display mt-2 text-4xl font-bold">Parlons de votre prochaine pièce</h1>
          <p className="mt-4 text-muted">
            Une question sur une matière, une commande, une collaboration ?
            L’équipe Sika répond sous 48h (scénario démo).
          </p>
          <div className="mt-8 space-y-2 text-sm">
            <p><strong>Email</strong> · hello@atelier-sika.demo</p>
            <p><strong>Tél.</strong> · +228 00 00 00 00</p>
            <p><strong>Adresse</strong> · Lomé, Togo (showroom fictionnel)</p>
            <p className="text-muted">Lun–Sam · 9h–18h</p>
          </div>
        </div>
        <form
          className="space-y-3 rounded-2xl border border-sand bg-chalk p-5"
          onSubmit={(e: FormEvent) => {
            e.preventDefault()
            alert('Message reçu — merci de votre intérêt pour Atelier Sika.')
            ;(e.target as HTMLFormElement).reset()
          }}
        >
          <input required placeholder="Votre nom" className="w-full rounded-xl border border-sand px-3 py-2" />
          <input required type="email" placeholder="Email" className="w-full rounded-xl border border-sand px-3 py-2" />
          <select className="w-full rounded-xl border border-sand px-3 py-2" defaultValue="commande">
            <option value="commande">Suivi de commande</option>
            <option value="produit">Question produit</option>
            <option value="presse">Presse / partenariat</option>
            <option value="autre">Autre</option>
          </select>
          <textarea required rows={5} placeholder="Votre message" className="w-full rounded-xl border border-sand px-3 py-2" />
          <button type="submit" className="rounded-full bg-indigo px-5 py-3 text-sm font-bold text-white">
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  )
}

export function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold">Mes commandes</h1>
      <p className="mt-2 text-muted">L’historique complet arrivera avec Supabase. Voici l’aperçu démo.</p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-sand bg-chalk">
        <div className="grid grid-cols-4 gap-2 border-b border-sand px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted">
          <span>N°</span><span>Date</span><span>Total</span><span>Statut</span>
        </div>
        <div className="grid grid-cols-4 gap-2 px-4 py-3 text-sm">
          <span>ASK-2026-1042</span><span>24/07/2026</span><span>35 000 XOF</span><span className="font-bold text-emerald-700">paid</span>
        </div>
      </div>
    </div>
  )
}

