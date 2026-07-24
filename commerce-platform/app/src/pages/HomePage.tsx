import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'

export function HomePage() {
  const { products, loading } = useCart()
  const featured = products.slice(0, 8)

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden text-white">
        <img
          src="./assets/brand/hero-atelier.jpg"
          alt="Intérieur Atelier Sika — textiles et lumière"
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/15" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24">
          <p className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Atelier <span className="text-copper">Sika</span>
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-copper">
            Boutique en ligne · Lifestyle
          </p>
          <h1 className="font-display mt-3 max-w-[16ch] text-4xl font-bold leading-tight sm:text-6xl">
            Objets justes, pour le quotidien.
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/90 sm:text-lg">
            Achetez en ligne tech douce, maison et accessoires — panier, paiement sécurisé, livraison démo.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/boutique" className="rounded-full bg-copper px-6 py-3 text-sm font-bold text-white hover:bg-copper-dark">
              Voir la boutique
            </Link>
            <Link to="/a-propos" className="rounded-full border border-white px-6 py-3 text-sm font-bold text-white">
              Notre histoire
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl font-bold">Coups de cœur de l’atelier</h2>
        <p className="mb-6 text-muted">
          {loading ? 'Chargement du catalogue…' : `${products.length} pièces — choisissez une quantité, ajoutez au panier.`}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/boutique" className="rounded-full bg-indigo px-6 py-3 text-sm font-bold text-white">
            Voir tout le catalogue
          </Link>
        </div>
      </section>
    </>
  )
}
