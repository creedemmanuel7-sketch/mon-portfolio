# User flows — CredoShop (MVP)

## Flow A — Achat heureux (happy path)

```
[Accueil]
    → [Catalogue]
        → [Fiche produit]
            → Ajouter au panier
                → [Panier]
                    → Passer commande
                        → [Checkout — infos]
                            → Payer (Stripe Checkout test)
                                → [Confirmation]
                                    → [Mes commandes]
```

### Points de décision

| Étape | Si… | Alors… |
|------|-----|--------|
| Panier vide | Clic « Commander » | Message + lien catalogue |
| Stripe annulé | Retour utilisateur | Retour panier, rien de payé |
| Stripe échec | CB test refusée | Message d’échec Stripe + retry |
| Session perdue | Retour confirmation | Afficher commande via `orderId` dans l’URL |

## Flow B — Navigation catalogue

```
[Accueil / hero]
  → Voir le catalogue
  → Filtrer catégorie (optionnel)
  → Ouvrir fiche
  → Retour catalogue (breadcrumb)
```

## Flow C — Panier multi-articles

```
Fiche A → + panier
Fiche B → + panier
[Panier] → qty++ / qty-- / supprimer
       → total recalculé
       → checkout
```

## Flow D — Recruteur (smoke démo)

```
Portfolio Crédo.ai
  → Lien CredoShop
    → Catalogue
      → Ajout 1 produit
        → Checkout + carte test Stripe 4242…
          → Confirmation visible
            → README / docs (optionnel)
```

## Wireframes associés

| Flow | Écrans |
|------|--------|
| A | catalogue, produit, panier, checkout, confirmation, commandes |
| B | index, catalogue, produit |
| C | panier |
| D | tous + lien portfolio (Étape 5) |
