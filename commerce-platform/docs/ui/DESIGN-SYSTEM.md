# Design System — Atelier Sika

## Marque

**Atelier Sika** est une boutique lifestyle contemporaine d’Afrique de l’Ouest.  
*Sika* évoque l’or (akan) : valeur, soin, objets durables. Marque **cliente fictive** — aucune allusion au portfolio Crédo.

**Tagline :** « Objets justes, pour le quotidien. »

## Direction visuelle

| Token | Valeur | Usage |
|-------|--------|--------|
| `--ink` | `#0F1C2E` | Texte principal |
| `--indigo` | `#1E3A5F` | Brand, header, CTA secondaires |
| `--copper` | `#B87333` | Accent, CTA primaire, prix |
| `--bone` | `#F3EFE7` | Fond page |
| `--chalk` | `#FAF8F4` | Cartes / surfaces |
| `--sand` | `#E7E0D4` | Bordures douces |
| `--muted` | `#5C6570` | Texte secondaire |
| `--success` | `#2F6B4F` | Confirmation |
| `--danger` | `#9B3B2F` | Erreurs |

**Typo :**  
- Display : **Fraunces** (titres éditoriaux)  
- UI : **Manrope** (corps, nav, boutons)

**Formes :** rayons 14–20px, ombres très légères, pas de glassmorphism portfolio.

**Motion :** fade-up au scroll, hover image scale doux, underline nav — 2–3 motions max utiles.

## Stack technique (Étape 3)

```
Vite + React + TypeScript + Tailwind
Supabase (Auth, Postgres, Storage)
Stripe Checkout + Webhooks
Netlify ou Vercel (functions)
```

## Composants UI (prototype)

Header sticky · Footer riche · Product card · Chips filtres · Boutons primary/ghost · Toast · Badge panier · Breadcrumb · Form fields · Order status pill
