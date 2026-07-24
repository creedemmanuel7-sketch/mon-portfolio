import { type MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import { useToast } from '../toast'
import type { Product } from '../types'
import { imgUrl, money } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { push } = useToast()
  const [qty, setQty] = useState(1)

  function bump(e: MouseEvent, next: number) {
    e.preventDefault()
    e.stopPropagation()
    setQty(Math.min(99, Math.max(1, next)))
  }

  function onAdd(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product.id, qty)
    push(`${qty}× ${product.name} ajouté au panier`, 'success')
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-sand bg-chalk transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/produit/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-sand">
          <img
            src={imgUrl(product.img)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-3 pt-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{product.cat}</div>
          <h3 className="mt-1 text-sm font-bold">{product.name}</h3>
          <div className="mt-1 font-bold text-copper">{money(product.price)}</div>
        </div>
      </Link>
      <div className="flex items-center gap-2 p-3 pt-2">
        <div className="inline-flex items-center rounded-full border border-sand bg-bone">
          <button
            type="button"
            aria-label={`Moins de ${product.name}`}
            className="h-8 w-8 text-sm font-bold"
            onClick={(e) => bump(e, qty - 1)}
          >
            −
          </button>
          <span className="min-w-6 text-center text-xs font-bold tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label={`Plus de ${product.name}`}
            className="h-8 w-8 text-sm font-bold"
            onClick={(e) => bump(e, qty + 1)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex-1 rounded-full bg-copper px-3 py-2 text-xs font-bold text-white hover:bg-copper-dark"
        >
          Panier
        </button>
      </div>
    </article>
  )
}
