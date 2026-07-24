# TOPO — Étape 2 : Design UI & Prototypage

## Décisions produit (validées par ta demande)

| Sujet | Choix |
|-------|--------|
| **Marque cliente** | **Atelier Sika** — boutique lifestyle contemporaine d’Afrique de l’Ouest (pas de lien au nom Crédo) |
| **Positionnement** | Objets du quotidien soignés : tech douce, maison, accessoires |
| **Thème** | Boutique dédiée — indigo profond + cuivre + ivoire (≠ portfolio Crédo.ai) |
| **Effet waouh** | Hero immersif, micro-animations, grille éditoriale, pages marque riches |
| **Stack (Étape 3)** | Vite + React + TypeScript + Tailwind · Supabase · Stripe Checkout · Netlify/Vercel |

### Pourquoi ce stack
- **Vite/React/TS** : concrète, moderne, alignée web/Android mindset
- **Supabase** : déjà vu sur Le Debout — Postgres, auth, RLS, commandes relationnelles
- **Stripe** : standard pro pour paiement démo
- **Netlify/Vercel** : deploy + functions pour sessions Stripe / webhooks

## Ce que je livre en Étape 2

1. Design system (`docs/ui/DESIGN-SYSTEM.md`)
2. Images générées (hero + produits)
3. Prototype HD cliquable : **15+ écrans**
4. Mise à jour brief / rename CredoShop → Atelier Sika
5. Carte portfolio mise à jour

## Écrans prévus

Accueil · Catalogue · Catégorie · Fiche produit · Panier · Checkout · Confirmation · Paiement annulé · Compte/Login · Mes commandes · Détail commande · Wishlist · À propos · Journal · Article · Contact · FAQ · Livraison · 404 · Recherche

## Hors scope Étape 2

Code app React réel, Stripe live, QA formelle → Étapes 3–5
