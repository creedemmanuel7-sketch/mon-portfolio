import { Link, useParams } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'
import { imgUrl, money } from '../types'

export function ProductPage() {
  const { id = '' } = useParams()
  const { getProduct, products, addToCart, toggleWish, wish } = useCart()
  const product = getProduct(id)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Produit introuvable</h1>
        <Link to="/boutique" className="mt-4 inline-block text-copper font-bold">Retour boutique</Link>
      </div>
    )
  }

  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="mb-4 text-sm text-muted">
        <Link to="/boutique">Boutique</Link> / {product.name}
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-sand">
          <img src={imgUrl(product.img)} alt={product.name} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-copper">{product.cat}</p>
          <h1 className="font-display mt-2 text-4xl font-bold">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold text-copper">{money(product.price)}</p>
          <p className="mt-4 text-muted">{product.desc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(product.id, 1)}
              className="rounded-full bg-copper px-6 py-3 text-sm font-bold text-white hover:bg-copper-dark"
            >
              Ajouter au panier
            </button>
            <button
              type="button"
              onClick={() => toggleWish(product.id)}
              className="rounded-full border border-ink px-6 py-3 text-sm font-bold"
            >
              {wish.includes(product.id) ? '♥ Favori' : '♡ Favoris'}
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display mb-4 text-2xl font-bold">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
