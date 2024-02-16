# Points communs et différences entre signaux et observables RxJS

Les observables RxJS, tout comme les signaux, permettent de mettre en œuvre une programmation réactive. Cependant, il existe des différences importantes entre ces deux approches. Nous allons les détailler dans cette section.

## Synchronicité

Les signaux sont nécessairement synchrones, tandis que les observables peuvent être synchrones ou asynchrones. En particulier, un signal DOIT être initialisé avec une valeur, tandis qu'un observable RxJS peut ne pas avoir de valeur initiale et ne produire sa première valeur que plus tard (dans le cas d'un Subject par exemple).

- Un signal primaire peut être comparé à un BehaviorSubject (il a toujours une valeur à publier).
- Un signal dérivé peut être comparé à un Observable RxJS qui aurait toujours une valeur à publier.

Ainsi, pour les cas où l'on a besoin de gérer des valeurs asynchrones, il est préférable d'utiliser des observables RxJS. Dans le cas où l'on gère des valeurs synchrones, les deux approches sont équivalentes et on choisira la plus simple à mettre en œuvre. Nous verrons de plus dans une section ultérieure qu'il est possible de convertir un observable RxJS en signal et vice-versa.

## Paradigme de programmation

Les signaux sont des variables qui peuvent être observées. Ils sont donc très proches des variables classiques et peuvent être utilisés dans le cadre d'une programmation impérative. Les observables RxJS sont des flux de données qui peuvent être observés. Ils sont donc plus proches des flux de données et sont plus adaptés à une programmation fonctionnelle.

## Usage typique

Dans le cadre d'Angular, les signaux seront plutôt utilisés pour gérer l'état interne d'un composant et les observables RxJS pour gérer l'accès à des services ou des données externes. Les observables RxJS offrent une grande richesse et une grande souplesse pour définir des flux de données ; ils sont à privilégier lorsque les flux sont relativement complexes et/ou asynchrones. Les signaux sont plus simples à mettre en œuvre et sont à privilégier lorsque les flux sont simples et synchrones. En pratique, l'usage de l'un ou l'autre peut aussi être conditionné par l'API des services utilisés.
