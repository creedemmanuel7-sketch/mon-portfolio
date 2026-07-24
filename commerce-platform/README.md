# CredoShop — Plateforme e-commerce (démo portfolio)

> Projet pédagogique / portfolio pour démontrer **backend**, **intégrations paiement** et **gestion des données**.

## État actuel

| Étape | Statut |
|------|--------|
| 1. Cadrage & UX | **En cours** |
| 2. Design UI & Prototypage | À venir |
| 3. Développement | À venir |
| 4. Qualification & Recette | À venir |
| 5. Déploiement | À venir |

## Structure

```
commerce-platform/
├── README.md                 ← ce fichier
├── docs/
│   ├── PROCESS.md            ← rôles & étapes
│   ├── ux/
│   │   ├── BRIEF.md          ← vision produit & MVP
│   │   ├── PERSONAS.md       ← utilisateurs cibles
│   │   └── USER-FLOWS.md     ← parcours clés
│   ├── specs/
│   │   └── SPEC-FONCTIONNELLE.md
│   └── wireframes/
│       └── INDEX.md
└── wireframes/               ← maquettes basse fidélité (HTML)
    ├── index.html
    ├── catalogue.html
    ├── produit.html
    ├── panier.html
    ├── checkout.html
    └── commandes.html
```

## Cloner sur ton PC (Windows)

Ce projet vit pour l’instant **dans** le dépôt portfolio (sous-dossier `commerce-platform/`), faute de pouvoir créer un dépôt GitHub séparé depuis l’agent cloud.

```powershell
# Dans PowerShell
cd C:\Users\credo\Projects
git clone https://github.com/creedemmanuel7-sketch/mon-portfolio.git
cd mon-portfolio\commerce-platform
start wireframes\index.html
```

### Plus tard : dépôt dédié (recommandé)

Sur ton PC, une fois prêt :

```powershell
cd C:\Users\credo\Projects
mkdir credo-shop
cd credo-shop
# copier le contenu de commerce-platform, puis :
git init
gh repo create creedemmanuel7-sketch/credo-shop --public --source=. --remote=origin --push
```

## Preview wireframes

Ouvre `wireframes/index.html` dans le navigateur (double-clic ou Live Server).

## Stack prévue (Étape 3 — à valider)

Proposée pour coller au portfolio Android/web + démo backend sérieuse :

- **Front** : HTML/CSS/JS ou Vite + React
- **Back / data** : Firebase Firestore ou Supabase (Postgres)
- **Paiement** : Stripe Checkout (mode test)
- **Auth** : email magique ou compte démo
- **Hébergement** : Netlify ou Vercel + GitHub Pages pour le lien portfolio
