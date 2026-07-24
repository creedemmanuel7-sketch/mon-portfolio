import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../cart'
import { ProductCard } from '../components/ProductCard'

const CATS = [
  { id: 'all', label: 'Tous' },
  { id: 'tech', label: 'Tech' },
  { id: 'maison', label: 'Maison' },
  { id: 'accessoires', label: 'Accessoires' },
]

export function ShopPage() {
  const { products, loading } = useCart()
  const [params, setParams] = useSearchParams()
  const initial = params.get('cat') || 'all'
  const [cat, setCat] = useState(initial)

  const filtered = useMemo(
    () => products.filter((p) => cat === 'all' || p.cat === cat),
    [products, cat],
  )

  function select(next: string) {
    setCat(next)
    if (next === 'all') setParams({})
    else setParams({ cat: next })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Boutique</h1>
      <p className="mt-2 text-muted">{loading ? 'Chargement…' : `${filtered.length} produit(s)`}</p>
      <div className="mt-6 mb-8 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => select(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              cat === c.id ? 'bg-indigo text-white' : 'border border-sand bg-chalk text-muted'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
