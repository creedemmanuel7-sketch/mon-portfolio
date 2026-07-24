# Atelier Sika — E-commerce démo (portfolio)

Boutique lifestyle **cliente fictive**.  
**40 produits** · prototype UI + app React (Étape 3).

## Preview

| Surface | Lien |
|---------|------|
| Prototype HTML (20 écrans) | [`ui/index.html`](ui/index.html) |
| App React (build) | [`app/dist/index.html`](app/dist/index.html) |
| Live UI | https://creedemmanuel7-sketch.github.io/mon-portfolio/commerce-platform/ui/ |
| Live React | https://creedemmanuel7-sketch.github.io/mon-portfolio/commerce-platform/app/dist/ |

## Stack Étape 3

- Vite + React + TypeScript + Tailwind
- Data : `data/products.json` (40 items)
- Panier / favoris : localStorage
- Prochain : Supabase + Stripe (voir `app/.env.example`)

```bash
cd commerce-platform/app
npm install
npm run dev
npm run build
```

## Windows

```powershell
cd C:\Users\credo\Projects
git clone https://github.com/creedemmanuel7-sketch/mon-portfolio.git
cd mon-portfolio\commerce-platform
start ui\index.html
# ou app React :
cd app
npm install
npm run dev
```
