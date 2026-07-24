# Spécification fonctionnelle — CredoShop MVP

**Version** : 0.1 (Étape 1)  
**Auteur** : Crédo ADJIGNON (+ agent)  
**Statut** : Brouillon validable avant Étape 2

---

## 1. Périmètre

Voir `docs/ux/BRIEF.md`. Ce document détaille les **règles métier** et les **écrans**.

## 2. Entités de données (cible backend)

### Product
| Champ | Type | Notes |
|-------|------|-------|
| id | string | UUID |
| slug | string | unique, URL |
| name | string | |
| description | string | markdown court OK |
| priceCents | number | entier (ex. 1500000 = 15 000 XOF) |
| currency | string | `XOF` (affichage) ; Stripe peut convertir / utiliser USD test |
| imageUrl | string | |
| category | string | enum: `accessoires`, `tech`, `lifestyle` |
| active | boolean | soft hide |
| stock | number | MVP : décrément optionnel ou illimité démo |

### Cart (client-side MVP acceptable)
| Champ | Type |
|-------|------|
| items[] | `{ productId, qty }` |
| updatedAt | timestamp |

Persistance panier : `localStorage` jusqu’au checkout ; commande = source de vérité serveur.

### Order
| Champ | Type | Notes |
|-------|------|-------|
| id | string | |
| email | string | |
| customerName | string | |
| addressLine | string | simplifié MVP |
| city | string | |
| items[] | snapshot produit + qty + priceCents | figé à l’achat |
| totalCents | number | |
| currency | string | |
| status | enum | `pending`, `paid`, `failed`, `cancelled` |
| stripeSessionId | string | nullable |
| createdAt | timestamp | |

### (Optionnel MVP) Customer
Session légère via email sur « Mes commandes » **ou** Firebase Auth anonyme / email link — à trancher Étape 3.

## 3. Écrans & règles

### E1 — Accueil
- Hero + CTA « Voir le catalogue »
- 3 produits mis en avant (seed)

### E2 — Catalogue
- Grille produits
- Filtre catégorie (chips)
- Clic → fiche

### E3 — Fiche produit
- Image, nom, prix, description
- Sélecteur qty (1–10)
- CTA « Ajouter au panier » → toast / badge panier

### E4 — Panier
- Lignes éditables
- Sous-total
- CTA « Commander » désactivé si vide

### E5 — Checkout
- Champs : nom*, email*, téléphone (opt), adresse*, ville*
- Récap commande
- CTA « Payer avec Stripe »
- Validation HTML5 + messages d’erreur

### E6 — Confirmation
- Message succès
- N° commande
- Lien « Mes commandes » / « Retour boutique »

### E7 — Mes commandes
- Liste par email (saisie) **ou** session
- Détail : items, total, statut, date

## 4. Paiement (Stripe)

- Mode **test** uniquement
- Checkout Session côté serveur (function / API)
- Webhook `checkout.session.completed` → `order.status = paid`
- Fallback : page success avec session_id + retrieve côté serveur

Carte test documentée dans README : `4242 4242 4242 4242`

## 5. Non-fonctionnel

| Critère | Cible |
|---------|-------|
| Perf mobile | LCP correcte, images lazy |
| Sécurité | Pas de secret Stripe publishable vs secret ; secret serveur only |
| Accessibilité | Focus visible, labels, contrastes |
| Navigateur | Chrome / Firefox / Edge récents |

## 6. Cas de test (esquisse QA — à enrichir Étape 3)

| ID | Cas | Attendu |
|----|-----|---------|
| TC-01 | Catalogue charge | ≥ 1 produit visible |
| TC-02 | Ajout panier | Badge qty incrémenté |
| TC-03 | Qty 0 / suppression | Ligne retirée, total OK |
| TC-04 | Checkout champs vides | Erreurs, pas de Stripe |
| TC-05 | Paiement test OK | Order `paid` |
| TC-06 | Annulation Stripe | Panier intact, pas d’order paid |
| TC-07 | Confirmation URL invalide | Message d’erreur soft |

## 7. Faisabilité technique (consultés : Dev & QA)

| Sujet | Décision proposée | Risque |
|-------|-------------------|--------|
| Stack front | Vite + React **ou** HTML progressif | Faible |
| Data | Firebase Firestore (déjà analytics portfolio) **ou** Supabase | Moyen (choix à figer Étape 2→3) |
| Paiement | Stripe Checkout + webhook | Moyen (config clés) |
| Hébergement | Netlify Functions / Vercel serverless | Faible |
| Testabilité | Seed déterministe + Stripe test | Faible |

**Recommandation** : Firebase (cohérence avec portfolio analytics) + Stripe + frontend Vite/React déployé Netlify/Vercel, lien depuis Crédo.ai.

## 8. Prochaine étape

**Étape 2** — Design UI : design system, maquettes HD des écrans E1–E7, prototype cliquable, validation effort Dev.
