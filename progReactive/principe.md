# Principe de la programmation réactive

La programmation réactive est un paradygme dans lequel on s'intéresse à la propagation des changements. Une modification sur une variable ou un fragment de code quelconque peut entrainer des modifications dans d'autres variables ou fragments de code.

Prenons un exemple simple, supposons des variables a, b et c telles que :

* `a = 1`
* `b = 2`
* `c = a + b`

Dans un langage impératif, si on modifie la valeur de `a` ou de `b`, la valeur de `c` ne sera pas modifiée. En revanche, en programmation réactive, si on modifie la valeur de `a` ou de `b`, la valeur de `c` sera modifiée en conséquence.

Si on indexe dans un tableau les valeurs successives de `a`, `b` et `c`, on obtient :

|               |   a   |   b   |   c   |
|---            |:-:    |:-:    |:-:    |
| initialisation|   1   |   2   |   3   |
| a = 3         |   3   |   2   |   5   |
| b = 5         |   3   |   5   |   8   |

## Dépendances

La programmation réactive se base sur le fait que des variables dépendent d'autres variables. Dans l'exemple précédent, la variable `c` dépend des variables `a` et `b`. On peut donc dire que `c` est une fonction de `a` et `b`.

On peut représenter les dépendances entre variables par un graphe orienté. Chaque variable est représentée par un nœud et une flèche part de chaque variable vers les variables qui en sont dépendantes.

<div style="text-align:center">
    <img src="local://assets/progReactive/dependances.abc.svg" alt="Graphe de dépendances entre les variables a, b et c" style="max-width: min(100%, 300px);" />
</div>

## Dépendances plus complexes

Le système de dépendances peut être plus complexe. Par exemple :

* `a = 3`
* `b = a + 2`
* `c = a + b`
* `d = b + c - 2a`

<div style="text-align:center">
    <img src="local://assets/progReactive/dependances.abcd.svg" alt="Graphe de dépendances entre les variables a, b, c et d" style="max-width: min(100%, 300px);" />
    <!-- Tiré de https://csacademy.com/app/graph_editor/ -->
</div>

## Nécessité d'éviter les cycles

Comme vous vous en doutez déjà, lle graphe de dépendance ne doit contenir aucun cycle. En effet, la présence d'un cycle impliquerait l'impossibilité de calculer les valeurs des variables.
