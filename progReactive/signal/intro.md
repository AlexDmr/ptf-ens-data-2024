# Mise en oeuvre de la programmation réactive avec les signaux

Angular a adopté depuis la version 16 les signaux pour gérer le data-binding. Les signaux offre une manière élégante d'aborder la programmation réactive, nous allons donc les étudier dans ce cours et les utliser dand nos TPs.

Notez que vous trouverez sur Internet beaucoup de code Angular qui a été écrit AVANT l'introduction des signaux, ce code est désormais obsolète et ne doit plus être utilisé dans ce cours.

## Qu'est ce qu'un signal ?

Un signal est en quelque sorte une variable "active" qui peut être considérée comme un ***observable***. La grande force des signaux est de pouvoir les combiner, un signal peut en effet résulter d'un calcul sur un ou plusieurs autres signaux. Dans ce cas, tout changement d'un des signaux "parents" entraîne une mise à jour du signal "enfant". En ce sens, un signal qui a des signaux parents est aussi un ***observateur***.

## Pourquoi les signaux avec Angular ?

Angular a introduit l'usage des signaux pour rendre le data-binding entre la vue et la vue-modèle des composants plus prédictible et plus efficace. L'ancienne façon de faire reposait sur l'utilisation de la bibliothèque Zone.js qui s'appuyait sur une observation des attributs du composant mais qui pouvait se révéler coûteuse et parfois difficile à débugger. Le data-binding et les mises à jour était faites de manière implicite. 

A contrario, les signaux rendent le data-binding plus explicite et plus facile à débugguer. En outre, nous verrons qu'ils s'interfacent "naturellement" avec les observables RxJS que nous étudierons plus tard dans le cours et qui ajoutent une dimension temporelle aux signaux tout en fournissant une algèbre de composition bien plus élaborée.
