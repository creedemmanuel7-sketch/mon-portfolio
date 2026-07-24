# Personas & user stories — CredoShop

## Personas

### P1 — Amina, acheteuse (primaire)

| | |
|--|--|
| Âge | 22–28 ans |
| Contexte | Étudiante / jeune pro à Lomé, achète en ligne sur mobile |
| But | Trouver un produit clair, payer vite, recevoir une confirmation |
| Frustrations | Sites lents, checkout trop long, pas de preuve de commande |
| Device | Smartphone Android (Chrome) |

### P2 — Karim, recruteur tech (secondaire — portfolio)

| | |
|--|--|
| Rôle | Recruteur / lead tech qui ouvre le portfolio |
| But | Vérifier en 5 min que le candidat sait faire du vrai web métier |
| Regarde | Qualité du code, Stripe, modèle de données, README |

### P3 — Crédo, opérateur démo (toi)

| | |
|--|--|
| But | Seed les produits, montrer une commande test, redéployer |
| Besoin | Scripts simples, mode test documenté |

---

## User stories MVP

### Catalogue & produit

- **US-01** En tant qu’Amina, je veux voir une liste de produits avec prix et photo, pour choisir rapidement.
- **US-02** En tant qu’Amina, je veux filtrer par catégorie, pour réduire le bruit.
- **US-03** En tant qu’Amina, je veux ouvrir une fiche produit détaillée, pour décider d’acheter.

### Panier

- **US-04** En tant qu’Amina, je veux ajouter un produit au panier depuis la fiche.
- **US-05** En tant qu’Amina, je veux modifier la quantité ou retirer un article.
- **US-06** En tant qu’Amina, je veux voir le total TTC (ou HT + mention démo) avant de payer.

### Checkout & paiement

- **US-07** En tant qu’Amina, je veux saisir nom / email / adresse (simplifiée), pour recevoir la confirmation.
- **US-08** En tant qu’Amina, je veux payer via une page sécurisée (Stripe test), sans entrer de vraie CB.
- **US-09** En tant qu’Amina, je veux une page de succès avec n° de commande.

### Commandes

- **US-10** En tant qu’Amina, je veux revoir mes commandes via mon email / session, pour vérifier l’historique.

### Opérateur / démo

- **US-11** En tant que Crédo, je veux un jeu de données seed (8–12 produits), pour une démo crédible.
- **US-12** En tant que recruteur, je veux un README « carte test Stripe », pour rejouer le parcours.

---

## Critères d’acceptation (ex. US-08)

```
Étant donné un panier non vide
Quand je clique sur « Payer »
Alors je suis redirigé vers Stripe Checkout (mode test)
Et après paiement test réussi, je reviens sur /confirmation?order=...
Et la commande est persistée en base avec statut "paid"
```
