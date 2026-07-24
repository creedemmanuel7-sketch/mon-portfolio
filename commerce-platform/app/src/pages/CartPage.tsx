import { Link } from 'react-router-dom'
import { useCart } from '../cart'
import { useToast } from '../toast'
import { imgUrl, money } from '../types'

export function CartPage() {
  const { cart, getProduct, setQty, removeFromCart, cartTotal } = useCart()
  const { push } = useToast()

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Panier vide</h1>
        <p className="mt-2 text-muted">Ajoutez des pièces depuis la boutique pour commencer.</p>
        <Link to="/boutique" className="mt-6 inline-block rounded-full bg-copper px-6 py-3 text-sm font-bold text-white">
          Voir la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-2xl border border-sand bg-chalk p-4">
        <h1 className="font-display mb-4 text-3xl font-bold">Panier</h1>
        {cart.map((row) => {
          const p = getProduct(row.id)
          if (!p) return null
          return (
            <div key={row.id} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 border-b border-sand py-3">
              <img src={imgUrl(p.img)} alt="" className="h-[72px] w-[72px] rounded-xl object-cover" />
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-sm text-muted">{money(p.price)}</div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-sand px-2 py-1">
                  <button type="button" aria-label="Diminuer" onClick={() => setQty(row.id, row.qty - 1)}>−</button>
                  <span className="min-w-6 text-center text-sm font-bold">{row.qty}</span>
                  <button type="button" aria-label="Augmenter" onClick={() => setQty(row.id, row.qty + 1)}>+</button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{money(p.price * row.qty)}</div>
                <button
                  type="button"
                  className="text-xs text-red-700"
                  onClick={() => {
                    removeFromCart(row.id)
                    push(`${p.name} retiré du panier`, 'info')
                  }}
                >
                  Retirer
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <aside className="h-fit rounded-2xl border border-sand bg-chalk p-5">
        <h2 className="font-display text-xl font-bold">Récapitulatif</h2>
        <div className="mt-4 flex justify-between text-sm"><span>Sous-total</span><span>{money(cartTotal)}</span></div>
        <div className="mt-1 flex justify-between text-sm"><span>Livraison</span><span>Offerte (démo)</span></div>
        <div className="mt-4 flex justify-between border-t border-sand pt-4 text-lg font-bold">
          <span>Total</span><span>{money(cartTotal)}</span>
        </div>
        <Link to="/checkout" className="mt-5 block rounded-full bg-copper py-3 text-center text-sm font-bold text-white">
          Commander
        </Link>
      </aside>
    </div>
  )
}
