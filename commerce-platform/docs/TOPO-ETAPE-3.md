# TOPO — Étape 3 : Développement

## Objectif
App **Vite + React + TypeScript + Tailwind**, catalogue **40 produits**, panier, **Stripe Checkout** (test), **Supabase orders**.

## Livré
1. Catalogue 40 produits + images
2. App React (boutique, panier, checkout, confirmation, commandes)
3. Stripe Checkout Session (API locale + Netlify Function)
4. Table `orders` Supabase + enregistrement post-paiement
5. Fixes Windows `.env.local` + idempotence `stripe_session_id`
6. Build `dist/` pour GitHub Pages + doc `DEMO-READY.md`

## Hors scope / suite optionnelle
- Auth utilisateurs + RLS stricte
- Webhook Stripe → `service_role`
- Deploy Netlify production (clés env)
- Admin stocks / CMS
