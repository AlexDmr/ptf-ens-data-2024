# Processus synchrones et asynchrones

Nous parlerons ici de ***processus asynchrone***. Un processus asynchrone est un processus qui n'est pas synchrone (merci à [M. de la Palisse](https://fr.wikipedia.org/wiki/Lapalissade)). Il convient donc dans un premier temps de rappeler ce qu'est un processus synchrone.

Un ***processus synchrone*** est constitué d'une séquence d'instructions (ex : A, B, C) qui seront exécutées une à une. Exécuter une instruction signifie la faire du début à la fin, on ne passera à la suivante que lorsqu'elle sera terminée (ex : B ne sera exécuté qu'une fois que A sera terminée).
Jusqu'à maintenant, c'est probablement le seul type de processus que vous avez rencontré.

## Processus asynchrone

Un processus est asynchrone s'il contient au moins une instruction asynchrone.
Une instruction est dite asynchrone si on passe à la suivante immédiatement après l'avoir démarrée, sans attendre qu'elle soit terminée.

Par exemple, supposons le programme suivant : **`A; B; C;`** avec :

* **`A`** : Afficher un message "début" dans le terminal (synchrone).
* **`B`** : Lire une musique de 2 minutes (asynchrone).
* **`C`** : Afficher un message "fin" dans le terminal (synchrone).

Lorsqu'il exécutera ce programme, l'utilisateur verra s'afficher immédiatement dans le terminal "début" et "fin" et il entendra la musique pendant 2 minutes. L'instruction **`A`** est synchrone, le programme attendra donc que le le message "début" soit effectivement affiché dans le terminal avant de passer à l'instruction **`B`**. L'instruction **`B`** est quant à elle asynchrone, elle va donc démarrer (ce qui va déclencher la lecture de la musique) et le programme exécutera alors l'instruction **`C`** sans attendre que la musique soit terminée (fin de l'instruction B).

En Javascript, il existe des instructions asynchrones comme par exemple fetch, qui permet d'émettre une requête HTTP et d'attendre la réponse sans bloquer la suite.

## Note : Processus asynchrone et parrallélisme

Il est bien sûr possible d'exécuter plusieurs flux d'instructions synchrones en parallèle, c'est ce qu'on fait classiquement en utilisant des threads. Cependant ce n'est pas ce à quoi se réfère un processus asynchrone.

## Problématiques liées aux instructions asynchrones

Dans l'exemple précédent, nous ne nous sommes pas posé la question d'exécuter une instruction après la fin de B (la fin de la musique). Savoir quand une instruction asynchrone se termine afin d'en exécuter une autre est l'une des problématiques qui se pose lorsqu'on construit des programmes asynchrones.

D'une manière générale, le problème est de pouvoir détecter la fin d'une ou plusieurs instructions asynchrone afin d'exécuter d'autres instructions (qui pourront être synchrones et/ou asynchrones).
