import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from './types'

type CartContextValue = {
  products: Product[]
  loading: boolean
  cart: CartItem[]
  wish: string[]
  addToCart: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  toggleWish: (id: string) => void
  cartCount: number
  cartTotal: number
  getProduct: (id: string) => Product | undefined
}

const CartContext = createContext<CartContextValue | null>(null)

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>(() => read('sika_cart', []))
  const [wish, setWish] = useState<string[]>(() => read('sika_wish', []))

  useEffect(() => {
    fetch('./data/products.json')
      .then((r) => r.json())
      .then((data: Product[]) => setProducts(data))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => localStorage.setItem('sika_cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('sika_wish', JSON.stringify(wish)), [wish])

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  )

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const row = prev.find((i) => i.id === id)
      if (row) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { id, qty }]
    })
  }, [])

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWish = useCallback((id: string) => {
    setWish((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])
  const cartTotal = useMemo(
    () =>
      cart.reduce((s, i) => {
        const p = products.find((x) => x.id === i.id)
        return s + (p ? p.price * i.qty : 0)
      }, 0),
    [cart, products],
  )

  const value = useMemo(
    () => ({
      products,
      loading,
      cart,
      wish,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWish,
      cartCount,
      cartTotal,
      getProduct,
    }),
    [
      products,
      loading,
      cart,
      wish,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWish,
      cartCount,
      cartTotal,
      getProduct,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
