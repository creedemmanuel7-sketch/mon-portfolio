export type Product = {
  id: string
  name: string
  price: number
  cat: 'tech' | 'maison' | 'accessoires' | string
  img: string
  desc: string
}

export type CartItem = { id: string; qty: number }

export const money = (n: number) =>
  new Intl.NumberFormat('fr-FR').format(n) + ' XOF'

export const imgUrl = (file: string) =>
  file.includes('/') ? file : `./assets/products/${file}`
