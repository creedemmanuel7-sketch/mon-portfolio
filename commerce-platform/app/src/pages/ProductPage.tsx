import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'
import { useToast } from '../toast'
import { imgUrl, money } from '../types'

export function ProductPage() {
  const { id = '' } = useParams()
  const { getProduct, products, addToCart, toggleWish, wish } = useCart()
  const { push } = useToast()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const product = getProduct(id)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Produit introuvable</h1>
        <p className="mt-2 text-muted">Ce lien ne correspond à aucun article du catalogue.</p>
        <Link to="/boutique" className="mt-4 inline-block text-copper font-bold">Retour boutique</Link>
      </div>
    )
  }

  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4)
  const liked = wish.includes(product.id)
  const productId = product.id
  const productName = product.name

  function onAdd() {
    addToCart(productId, qty)
    setJustAdded(true)
    push(`${qty}× ${productName} ajouté au panier`, 'success')
    window.setTimeout(() => setJustAdded(false), 1600)
  }

  function onWish() {
    toggleWish(productId)
    push(liked ? 'Retiré des favoris' : 'Ajouté aux favoris', 'info')
  }

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

          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Quantité</p>
            <div className="inline-flex items-center gap-1 rounded-full border border-sand bg-chalk p-1">
              <button
                type="button"
                aria-label="Diminuer la quantité"
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold hover:bg-sand"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="min-w-10 text-center text-base font-bold tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Augmenter la quantité"
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold hover:bg-sand"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onAdd}
              className={`rounded-full px-6 py-3 text-sm font-bold text-white transition ${
                justAdded ? 'bg-emerald-700' : 'bg-copper hover:bg-copper-dark'
              }`}
            >
              {justAdded ? 'Ajouté ✓' : `Ajouter ${qty > 1 ? `${qty} articles` : 'au panier'}`}
            </button>
            <button
              type="button"
              onClick={onWish}
              className="rounded-full border border-ink px-6 py-3 text-sm font-bold"
            >
              {liked ? '♥ Favori' : '♡ Favoris'}
            </button>
            <Link to="/panier" className="rounded-full border border-sand px-6 py-3 text-sm font-bold text-muted hover:text-ink">
              Voir le panier
            </Link>
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
