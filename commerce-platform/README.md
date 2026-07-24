# Atelier Sika — E-commerce démo (portfolio)

Boutique lifestyle **cliente fictive** (pas une marque personnelle).  
Objectif : démontrer frontend riche, backend, paiement Stripe et data.

## Marque

**Atelier Sika** — « Objets justes, pour le quotidien. »  
Thème dédié : indigo · cuivre · ivoire (≠ portfolio Crédo.ai).

## État

| Étape | Statut |
|------|--------|
| 1. Cadrage & UX | ✅ |
| 2. Design UI & Prototypage | ✅ Prototype HD 20 écrans + images |
| 3. Développement (Vite/React/Supabase/Stripe) | À venir |
| 4. QA | À venir |
| 5. Déploiement + lien portfolio | Partiel (prototype en ligne) |

## Preview UI (maintenant)

Ouvre : [`ui/index.html`](ui/index.html)

Live (après deploy) :  
https://creedemmanuel7-sketch.github.io/mon-portfolio/commerce-platform/ui/

## Stack choisie (Étape 3)

- **Vite + React + TypeScript + Tailwind**
- **Supabase** (Auth, Postgres, RLS)
- **Stripe Checkout** + webhooks
- **Netlify ou Vercel**

## Contenu livré Étape 2

- Design system : `docs/ui/DESIGN-SYSTEM.md`
- Topo : `docs/TOPO-ETAPE-2.md`
- 10 images produits + hero/about générées : `assets/`
- 20 écrans prototype : `ui/`
- Panier / favoris en `localStorage` (simulation)

## Cloner sur Windows

```powershell
cd C:\Users\credo\Projects
git clone https://github.com/creedemmanuel7-sketch/mon-portfolio.git
cd mon-portfolio\commerce-platform
start ui\index.html
```
