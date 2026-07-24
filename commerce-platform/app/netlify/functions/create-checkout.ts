import type { Config, Context } from '@netlify/functions'
import Stripe from 'stripe'

export default async (req: Request, _context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const secret = Netlify.env.get('STRIPE_SECRET_KEY') || process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return Response.json({ error: 'STRIPE_SECRET_KEY manquante' }, { status: 500 })
  }

  try {
    const stripe = new Stripe(secret)
    const body = await req.json()
    const { items, customer, successUrl, cancelUrl } = body

    if (!Array.isArray(items) || !items.length) {
      return Response.json({ error: 'Panier vide' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'fr',
      line_items: items.map((item: { qty: number; price: number; name: string; desc?: string; image?: string }) => ({
        quantity: item.qty,
        price_data: {
          currency: 'xof',
          unit_amount: item.price,
          product_data: {
            name: item.name,
            description: item.desc?.slice(0, 200),
            images: item.image ? [item.image] : undefined,
          },
        },
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customer?.email,
      metadata: {
        customer_name: customer?.name || '',
        city: customer?.city || '',
        address: customer?.address || '',
      },
    })

    return Response.json(
      { id: session.id, url: session.url },
      { headers: { 'Access-Control-Allow-Origin': '*' } },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur Stripe'
    return Response.json({ error: message }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } })
  }
}

export const config: Config = {
  path: '/api/create-checkout',
}
