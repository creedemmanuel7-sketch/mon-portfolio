import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'

export function HomePage() {
  const { products, loading } = useCart()
  const featured = products.slice(0, 8)

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden text-white">
        <img
          src="./assets/brand/hero-atelier.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-copper">Nouvelle sélection · 40 pièces</p>
          <h1 className="font-display max-w-[14ch] text-4xl font-bold leading-tight sm:text-6xl">
            Objets justes, pour le quotidien.
          </h1>
          <p className="mt-4 max-w-md text-white/90">
            Maison lifestyle contemporaine : tech douce, maison et accessoires.
            Peu d’objets. Beaucoup de présence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/boutique" className="rounded-full bg-copper px-6 py-3 text-sm font-bold text-white hover:bg-copper-dark">
              Entrer dans la boutique
            </Link>
            <Link to="/a-propos" className="rounded-full border border-white px-6 py-3 text-sm font-bold text-white">
              Lire notre histoire
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-sand bg-chalk p-4 text-center">
            <div className="font-display text-2xl font-bold">{loading ? '…' : products.length}</div>
            <div className="text-xs uppercase tracking-wider text-muted">Produits</div>
          </div>
          <div className="rounded-2xl border border-sand bg-chalk p-4 text-center">
            <div className="font-display text-2xl font-bold">3</div>
            <div className="text-xs uppercase tracking-wider text-muted">Univers</div>
          </div>
          <div className="rounded-2xl border border-sand bg-chalk p-4 text-center">
            <div className="font-display text-2xl font-bold">XOF</div>
            <div className="text-xs uppercase tracking-wider text-muted">Devise</div>
          </div>
        </div>
        <h2 className="font-display text-3xl font-bold">Coups de cœur de l’atelier</h2>
        <p className="mb-6 text-muted">Des pièces pour le matin, le soir, et le chemin entre les deux.</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/boutique" className="rounded-full bg-indigo px-6 py-3 text-sm font-bold text-white">
            Voir les {products.length || 40} produits
          </Link>
        </div>
      </section>
    </>
  )
}
