/** Envoi d’un message vers Supabase (table contact_messages). */
const SUPABASE_URL = 'https://mgocgzcpqnbcaqtclvsz.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nb2NnemNwcW5iY2FxdGNsdnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTE0MzIsImV4cCI6MjEwMDQ4NzQzMn0.G-Jzh3diVxPes998dtAqitzziBbwvLj8wSy4v7QVnVw'

export type ContactPayload = {
  source: 'portfolio' | 'atelier-sika'
  name: string
  email: string
  reason: string
  message: string
  meta?: Record<string, string>
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        source: payload.source,
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        reason: payload.reason,
        message: payload.message.trim(),
        meta: payload.meta ?? {},
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      if (/contact_messages|PGRST205|schema cache/i.test(text)) {
        return {
          ok: false,
          error: 'Table contact_messages absente — exécute supabase/contact_messages.sql',
        }
      }
      return { ok: false, error: text.slice(0, 180) || `Erreur ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Réseau indisponible' }
  }
}
