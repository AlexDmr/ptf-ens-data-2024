s# Flux synchrones et asynchrones

Nous parlerons ici de ***flux asynchrone***. Un flux asynchrone est un flux qui n'est pas synchrone (merci à [M. de la Palisse](https://fr.wikipedia.org/wiki/Lapalissade)). Il convient donc dans un premier temps de rappeler ce qu'est un flux synchrone.

Un ***flux synchrone*** est constitué d'une séquence d'instructions (ex : A, B, C) qui seront exécutées une à une. Exécuter une instruction signifie la faire du début à la fin, on ne passera à la suivante que lorsqu'elle sera terminée (ex : B ne sera exécuté qu'une fois que A sera terminée).
Jusqu'à maintenant, c'est probablement le seul type de flux que vous avez rencontré.

## Flux asynchrone

Un flux est asynchrone s'il contient au moins une instruction asynchrone.
Une instruction est dite asynchrone si on passe à la suivante immédiatement après l'avoir démarrée, sans attendre qu'elle soit terminée.

Par exemple, supposons le programme suivant :

```typescript
A; 
B; 
Quand B termine alors exécuter D;
C;
```

Avec :

* **`A`** : Afficher un message "début" dans le terminal (synchrone).
* **`B`** : Lire une musique de 2 minutes (asynchrone).
* **`C`** : Afficher un message "fin" dans le terminal (synchrone).
* **`D`** une instruction qui affiche un message "plus de musique" dans le terminal (synchrone).

Lorsqu'il exécutera ce programme, l'utilisateur verra s'afficher immédiatement dans le terminal "début" et "fin" et il entendra la musique pendant 2 minutes. L'instruction **`A`** est synchrone, le programme attendra donc que le le message "début" soit effectivement affiché dans le terminal avant de passer à l'instruction **`B`**. L'instruction **`B`** est quant à elle asynchrone, elle va donc démarrer (ce qui va déclencher la lecture de la musique) et le programme exécutera alors l'instruction **`C`** sans attendre que la musique soit terminée (fin de l'instruction B). Quand la musique sera terminée, l'instruction **`D`** sera exécutée.

En Javascript, il existe des instructions asynchrones comme par exemple [**`fetch`**](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API), qui permet d'émettre une requête HTTP et d'attendre la réponse sans bloquer la suite.

## Note : flux asynchrone et parrallélisme

Il est bien sûr possible d'exécuter plusieurs flux d'instructions synchrones en parallèle, c'est ce qu'on fait classiquement en utilisant des threads. Cependant ce n'est pas ce à quoi se réfère un flux asynchrone.

Le flux asynchrone met en oeuvre des instructions au sein d'un seul thread. Ces instructions ***peuvent*** donner lieu à la création d'autres threads. Ce que décrit un flux synchrone, c'est la façon dont les instructions sont enchainés au sein de ce flux. On ne s'occupe pas de savoir comment sont implémentées les instructions asynchrones, on ne peut pas créer de threads nous même, on ne peut pas non plus savoir si une instruction asynchrone va créer un thread ou non. Encore une fois, le problème n'est pas de créer des threads mais de décrire comment enchainer les instructions au sein du flux.

Reprenons l'exemple précédent. L'instruction **`B`** est asynchrone, cela signifie qu'on peut démarrer son exécution et passer à la suite (ici exécuter l'instruction **`C`**) et qu'on a un moyen de savoir quand elle est terminée pour exécuter ensuites d'autres instructions (ici l'instruction **`D`**).

### La problématique des flux asynchrone est de donner les moyens d'exprimer ce type d'ordonnancement
