# Où mettre service_role ? (réponse courte)

## ❌ Ne JAMAIS le mettre dans le dépôt Git

Pas dans :
- le code source
- `.env.example`
- GitHub (même en privé si tu peux l’éviter)
- `VITE_…` (tout `VITE_` part dans le navigateur)

## ✅ Où le mettre

| Environnement | Où |
|---------------|-----|
| **Local** | `commerce-platform/app/.env.local` → `SUPABASE_SERVICE_ROLE_KEY=...` (déjà gitignored) |
| **Netlify** | Site settings → Environment variables → `SUPABASE_SERVICE_ROLE_KEY` |
| **Vercel** | Project → Settings → Environment Variables |

Utilisation : **uniquement** dans une fonction serveur (webhook Stripe, admin).  
Le front n’utilise que **URL + anon**.

## Correction de tes variables

Tu as collé `sb_publishable_…` dans `VITE_SUPABASE_URL` — ce n’est **pas** une URL.

La bonne URL (déduite de ton JWT anon) est :

```env
VITE_SUPABASE_URL=https://mgocgzcpqnbcaqtclvsz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Activer les tables

1. Supabase Dashboard → **SQL Editor**
2. Colle le contenu de `commerce-platform/app/supabase/orders.sql`
3. **Run**
