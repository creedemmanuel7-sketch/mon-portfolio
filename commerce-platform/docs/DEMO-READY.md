# Atelier Sika — démo prête

Boutique e-commerce **portfolio** (marque cliente fiction) : Design → Dev → Stripe test → Supabase orders.

## Stack
Vite · React · TypeScript · Tailwind · Stripe Checkout · Supabase (`orders`) · Netlify Functions (option)

## Validé en local
1. `npm install` dans `commerce-platform/app`
2. `.env.local` avec `STRIPE_SECRET_KEY` (sans `VITE_`) + Supabase URL/anon
3. SQL `supabase/orders.sql` exécuté une fois
4. Terminal A : `npm run stripe:api`
5. Terminal B : `npm run dev`
6. Checkout carte `4242…` → confirmation → **Mes commandes**

Diagnostic env Windows : `npm run env:check`

## GitHub Pages
- App buildée : `commerce-platform/app/dist/`
- Catalogue / lecture commandes Supabase : OK
- **Stripe live sur GH Pages : non** (pas de serveur secret) → bouton « Simuler succès » ou déployer sur Netlify

## Netlify (Stripe en ligne)
```bash
cd commerce-platform/app
npx netlify login
npx netlify init   # ou link
# Site settings → Env :
#   STRIPE_SECRET_KEY=sk_test_…
#   (optionnel) VITE_* déjà dans .env.production au build
npx netlify deploy --prod
```
L’app appelle `/api/create-checkout` automatiquement hors localhost.

## Secrets
| Variable | Où |
|----------|-----|
| `VITE_SUPABASE_*` / `VITE_STRIPE_PUBLISHABLE_KEY` | front OK |
| `STRIPE_SECRET_KEY` | `.env.local` ou Netlify env — **jamais** `VITE_` / Git |
| `SUPABASE_SERVICE_ROLE_KEY` | serveur seulement, plus tard (webhooks) |

Voir aussi `SUPABASE-CLES.md`.
