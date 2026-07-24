import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { imgUrl, money } from '../types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/produit/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-sand bg-chalk transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-sand">
        <img
          src={imgUrl(product.img)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{product.cat}</div>
        <h3 className="mt-1 text-sm font-bold">{product.name}</h3>
        <div className="mt-1 font-bold text-copper">{money(product.price)}</div>
      </div>
    </Link>
  )
}
