import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from './cart'
import { Layout } from './components/Layout'
import { CartPage } from './pages/CartPage'
import {
  AboutPage,
  CheckoutPage,
  ConfirmationPage,
  ContactPage,
  OrdersPage,
  WishPage,
} from './pages/ExtraPages'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import { ShopPage } from './pages/ShopPage'
import { ToastProvider } from './toast'

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="boutique" element={<ShopPage />} />
              <Route path="produit/:id" element={<ProductPage />} />
              <Route path="panier" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="confirmation" element={<ConfirmationPage />} />
              <Route path="favoris" element={<WishPage />} />
              <Route path="a-propos" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="commandes" element={<OrdersPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </CartProvider>
    </ToastProvider>
  )
}
