import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../cart'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-semibold transition ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`

export function Layout() {
  const { cartCount, wish } = useCart()
  const [bump, setBump] = useState(false)

  useEffect(() => {
    if (cartCount <= 0) return
    setBump(true)
    const t = window.setTimeout(() => setBump(false), 450)
    return () => window.clearTimeout(t)
  }, [cartCount])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-indigo text-white text-center text-xs tracking-wide py-2 px-3">
        Boutique en ligne Atelier Sika · Livraison offerte dès 50 000 XOF · Paiement Stripe test
      </div>
      <header className="sticky top-0 z-40 border-b border-sand bg-bone/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            Atelier <span className="text-copper">Sika</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/boutique" className={linkClass}>Boutique</NavLink>
            <NavLink to="/a-propos" className={linkClass}>À propos</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/favoris" className="relative rounded-full border border-sand bg-chalk px-3 py-2 text-sm font-bold">
              ♥ {wish.length > 0 && <span className="text-copper">{wish.length}</span>}
            </Link>
            <Link
              to="/panier"
              className={`relative rounded-full border border-sand bg-chalk px-3 py-2 text-sm font-bold ${bump ? 'cart-bump' : ''}`}
            >
              Panier
              {cartCount > 0 && (
                <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-copper px-1.5 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="mt-10 bg-ink text-white/70">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-4">
          <div>
            <div className="font-display text-lg text-white">Atelier <span className="text-copper">Sika</span></div>
            <p className="mt-2 text-sm max-w-[28ch]">Boutique lifestyle en ligne — objets justes pour le quotidien.</p>
          </div>
          <div className="text-sm space-y-2">
            <div className="font-bold text-white">Boutique</div>
            <Link to="/boutique">Tous les produits</Link>
            <Link className="block" to="/boutique?cat=tech">Tech</Link>
            <Link className="block" to="/boutique?cat=maison">Maison</Link>
          </div>
          <div className="text-sm space-y-2">
            <div className="font-bold text-white">Maison</div>
            <Link className="block" to="/a-propos">Notre histoire</Link>
            <Link className="block" to="/contact">Contact</Link>
          </div>
          <div className="text-sm space-y-2">
            <div className="font-bold text-white">Compte</div>
            <Link className="block" to="/commandes">Mes commandes</Link>
            <Link className="block" to="/panier">Panier</Link>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
          © 2026 Atelier Sika — Démo e-commerce portfolio
        </div>
      </footer>
    </div>
  )
}
