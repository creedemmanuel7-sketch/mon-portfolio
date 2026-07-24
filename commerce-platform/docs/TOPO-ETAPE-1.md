# TOPO — Étape 1 (Cadrage & UX)

## Ce que je fais dans cette étape

1. Clarifier le besoin → **CredoShop** (démo e-commerce portfolio)
2. Définir personas + user stories
3. Dessiner les user flows (achat, panier, Stripe, recruteur)
4. Rédiger la spec fonctionnelle MVP + modèle de données
5. Produire des **wireframes HTML** basse fidélité (E1–E7)
6. Noter la faisabilité (Firebase/Supabase + Stripe + Vite)

## Ce que je ne fais PAS encore

- Design UI haute fidélité / Figma HD → **Étape 2**
- Code app réel, Stripe live, base prod → **Étape 3**
- Campagne de tests QA formelle → **Étape 4**
- Mise en prod + lien portfolio → **Étape 5**

## Livrables (ce dossier)

- `docs/ux/BRIEF.md`
- `docs/ux/PERSONAS.md`
- `docs/ux/USER-FLOWS.md`
- `docs/specs/SPEC-FONCTIONNELLE.md`
- `wireframes/*.html`

## Blocages environnement

- Impossible de **créer un dépôt GitHub séparé** depuis l’agent (token 403)
- Impossible de cloner vers `C:\Users\credo\Projects` (agent cloud Linux, pas ton PC)
- Contournement : projet dans `mon-portfolio/commerce-platform/` + commandes clone Windows dans le README

## Validation attendue de ta part

Avant Étape 2, confirme si OK :

1. Nom **CredoShop**
2. MVP = catalogue → panier → Stripe test → commandes (sans admin UI)
3. Devise affichée **XOF** (paiement Stripe test possible en USD derrière)
4. Stack proposée Firebase + Stripe + Vite/React
