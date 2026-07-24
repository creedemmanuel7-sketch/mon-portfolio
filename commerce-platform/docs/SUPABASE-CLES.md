# Supabase — clés nécessaires pour Atelier Sika

## Oui, on en aura besoin (étape suivante)

| Clé | Où l’utiliser | Publique ? |
|-----|----------------|------------|
| **Project URL** (`VITE_SUPABASE_URL`) | Front React | Oui |
| **anon public** (`VITE_SUPABASE_ANON_KEY`) | Front React (avec RLS) | Oui (protégée par RLS) |
| **service_role** | Serveur / fonctions uniquement (admin, webhooks) | **NON — jamais dans le front ni Git** |

On n’a **pas** besoin de la database password dans le front.

## Où les trouver

1. Va sur [https://supabase.com](https://supabase.com) → **Sign in** (GitHub OK)
2. **New project** (ex. `atelier-sika`)
   - Region proche (ex. Frankfurt / EU)
   - Mot de passe DB : à garder dans un gestionnaire de mots de passe
3. Dans le projet : **Project Settings** (icône engrenage) → **API**
4. Copie :
   - **Project URL**
   - **anon public**
5. (Plus tard, pour le webhook Stripe côté serveur) : **service_role** — à mettre seulement dans Netlify/Vercel env, jamais dans le code client

## À m’envoyer ensuite (safe)

Tu peux coller ici :
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

**Ne m’envoie pas** `service_role` dans le chat si possible ; configure-la directement dans le dashboard Netlify/Vercel. Si tu dois la partager, on la mettra uniquement en `.env.local` gitignored.

## À quoi ça servira chez Sika

- Auth client (compte / commandes)
- Tables `products` (optionnel) + `orders` + `order_items`
- Historique « Mes commandes » réel
- (Optionnel) Storage pour images
