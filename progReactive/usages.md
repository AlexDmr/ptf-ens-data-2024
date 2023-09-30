# Quelques cas d'usage

Nous discutons dans cette section de quelques cas d'usage du patron de cnception observateur/observable ainsi que de la programmation réactive.

## Mise en oeuvre du patron de conception Observateur/Observable

Ce patron de conception est mis en oeuvre dans de nombreux systèmes. En voici quelques exemples :

* Dans le navigateur, on peut s'abonner à des événements. Par exemple, on peut s'abonner à l'événement « click » d'un bouton. Lorsque l'événement se produit, le bouton notifie tous ses abonnés. Les abonnés sont généralement des fonctions qu'on appelle callback (qu'on peut traduire par fonction de rappel).
* Toujours dans le navigateur, on peut s'abonner au chargement d'une page. Lorsque la page est chargée, le navigateur notifie tous ses abonnés (des callbacks).
* Encore dans le navigateur, on peut s'abonner au chargement d'une image, à la fin d'une animation, au fait qu'une vidéo soit prête à être lue, etc.
* Dans un système de gestion de version GIT, on peut s'abonner à la modification d'un fichier. Lorsque le fichier est modifié, le système de gestion de version notifie tous ses abonnés.
* Dans un système de messagerie, on peut s'abonner à la réception d'un message. Lorsqu'un message est reçu, le système de messagerie notifie tous ses abonnés.

## Mise en oeuvre de la programmation réactive

La programmation réactive, qui généralise le patron de conception observateur/observable, est mise de plus en plus en oeuvre dans les systèmes interactifs, que ce soit à l'aide de framework dédiés ou pas.

Dans ce cours, nous allons nous intéresser à la mise en oeuvre de la programmation réactive à l'aide de deux frameworks utilisés dans Angular :

* Les signaux : C'est le mécanisme actuellement recommandé pour la mise en oeuvre de la programmation réactive dans Angular.
* Les observables RxJS : Ce mécanisme est plus riche que celui offert par les signaux (en particulier il gère finement les aspects temporels qui sont absent des signaux). Il est cependant plus complexe à mettre en oeuvre.
