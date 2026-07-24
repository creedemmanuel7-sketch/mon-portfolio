import { supabase, supabaseConfigured } from './supabase'

export type OrderItem = {
  id: string
  name: string
  qty: number
  price: number
}

export type OrderRow = {
  id: string
  created_at: string
  email: string
  customer_name: string | null
  address_line: string | null
  city: string | null
  total_cents: number
  currency: string
  status: 'pending' | 'paid' | 'failed' | 'cancelled'
  stripe_session_id: string | null
  items: OrderItem[]
}

export async function savePaidOrder(input: {
  email: string
  customerName?: string
  address?: string
  city?: string
  totalCents: number
  items: OrderItem[]
  stripeSessionId?: string | null
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (!supabaseConfigured || !supabase) {
    return { ok: false, error: 'Supabase non configuré' }
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      email: input.email.trim().toLowerCase(),
      customer_name: input.customerName || null,
      address_line: input.address || null,
      city: input.city || null,
      total_cents: input.totalCents,
      currency: 'XOF',
      status: 'paid',
      stripe_session_id: input.stripeSessionId || null,
      items: input.items,
    })
    .select('id')
    .single()

  // Refresh confirmation / double-submit : session Stripe déjà enregistrée → succès
  if (error && input.stripeSessionId && /duplicate key|orders_stripe_session_id/i.test(error.message)) {
    const existing = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_session_id', input.stripeSessionId)
      .maybeSingle()
    if (existing.data?.id) return { ok: true, id: existing.data.id as string }
  }

  if (error) return { ok: false, error: error.message }
  return { ok: true, id: data.id as string }
}

export async function fetchOrdersByEmail(email: string): Promise<{
  ok: true
  orders: OrderRow[]
} | { ok: false; error: string }> {
  if (!supabaseConfigured || !supabase) {
    return { ok: false, error: 'Supabase non configuré' }
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .order('created_at', { ascending: false })

  if (error) return { ok: false, error: error.message }
  return { ok: true, orders: (data || []) as OrderRow[] }
}
