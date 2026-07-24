# Brief produit — Atelier Sika

## Vision (1 phrase)

**Atelier Sika** est une boutique lifestyle cliente (fiction) qui montre qu’un développeur peut livrer un parcours d’achat complet : catalogue, panier, paiement test, commandes et données persistantes.

## Pourquoi ce projet (portfolio)

Tu privilégies l’**Android / web** pour le côté concret. CredoShop est le projet **web full-stack** du portfolio :

| Compétence démontrée | Où ça se voit |
|----------------------|---------------|
| Frontend | Catalogue, panier, checkout UI |
| Backend / API | Produits, commandes, auth |
| Paiement | Stripe Checkout (mode test) |
| Données | Catalogue + historique commandes |
| Qualité | Specs, cas de test, smoke |

## Problème utilisateur

Un acheteur veut trouver un produit, le payer en ligne, et retrouver sa commande — sans friction, sur mobile comme desktop.

## Objectifs MVP (Étape 1 → 3)

### In scope (MVP)

1. **Catalogue** — liste produits (nom, prix, image, catégorie)
2. **Fiche produit** — détail + ajout panier
3. **Panier** — quantités, total, suppression
4. **Checkout** — coordonnées + paiement Stripe (test)
5. **Confirmation** — page succès + n° de commande
6. **Mes commandes** — historique (compte démo ou email)
7. **Admin minimal** — seed produits (script ou console), pas d’UI admin complète

### Out of scope (V2+)

- Marketplace multi-vendeurs
- Mobile app native (peut venir plus tard en Android)
- Stocks temps réel complexes / entrepôts
- Avis clients, wishlist, promo codes avancés
- Multi-devises / multi-langues
- Chat support

## Contraintes

- Démo **publique** → Stripe en **mode test** uniquement, données fictives
- Pas de secrets en clair dans le front
- Responsive (mobile-first)
- Cohérence visuelle possible avec Crédo.ai (ambre `#E8B84A` + dark) **ou** thème boutique dédié (à trancher Étape 2)

## Indicateurs de succès (démo)

- Un recruteur peut acheter un produit test en &lt; 3 minutes
- Une commande apparaît en base / historique
- Le README explique comment relancer le flux Stripe test
- Lien visible depuis le portfolio

## Nom & positionnement

- **Nom** : Atelier Sika (marque cliente — *sika* = or en akan ; aucune allusion personnelle)  
- **Tagline** : « Objets justes, pour le quotidien. »  
- **Public démo** : recruteurs (parcours e-commerce full-stack), et toi pour stages Android/web
