# Qu'est ce que Typescript ?

Typescript est un sur-ensemble de Javascript, c'est-à-dire qu'un programme écrit en Javascript est aussi un programme Typescript. Les programmes Typescript sont **compilés** vers du Javascript. Ce qu'ajoute Typescript, c'est principalement le **typage statique**, ainsi que les [décorateurs](https://www.typescriptlang.org/docs/handbook/decorators.html). Les décorateurs sont des fonctions qui s'appliquent et modifient des classes, des méthodes ou des attributs. Nous les utiliserons lorsque nous programmerons avec Angular mais nous n'apprendrons pas à en écrire nous-mêmes. Si toutefois vous êtes curieux, vous pouvez consulter [la page dédiée sur le site du langage](https://www.typescriptlang.org/docs/handbook/decorators.html).

## Ressources utiles pour ce cours

* Le site du langage Typescript : https://www.typescriptlang.org/
  * En particulier, la documentation : https://www.typescriptlang.org/docs
  * Et le playground : https://www.typescriptlang.org/play
* Mozilla Developer Network (MDN) : https://developer.mozilla.org/fr/

## Les types en Typescript

Il existe des types de bases en Typescript, ce sont les même types que ceux qui sont inférés par Javascript. En Typescript, il est possible de typer explicitement ou implicitement les constantes et les variables. Contrairement à Javascript, il n'est pas possible de changer le type d'une variable après l'avoir affectée ou déclarée - **et c'est une très bonne chose !** Cela évite bien des erreurs qui peuvent être commises en Javascript.

Plus généralement, le typage statique permet de faire des vérifications à la compilation, avant d'exécuter le code. In fine, cela permet de détecter bon nombre d'erreurs **AVANT** de déployer votre code.

L'exemple suivant illustre l'impossibilité de changer le type d'une variable en Typescript (contrairement à Javascript). On peut noter que le programme Typescript ressemble beaucoup à Javascript, c'est normal car comme on l'a dit Typescript est un sur-ensemble de Javascript. Ici, le typage de la variable toto est fait implicitement par Typescript. Comme toto est assignée à une chaine de caractères, Typescript en déduit que son type est "string". De ce fait, la tentative de ré-assignement à la valeur 42 lève une erreur de compilation (ou bien vous verrez cette erreur directement dans votre éditeur de code préféré).

```typescript
let toto = "bonjour";
console.log( typeof toto );
// => "string"
toto = 42; // ERREUR, types incompatibles
```

Le comportement est le même si l'on déclare explicitement le type de la variable toto, en ajoutant un ":" suivi du type (ici, "string").

```typescript
let toto: string = "bonjour";
console.log( typeof toto );
// => "string"
toto = 42; // ERREUR, types incompatibles
```

Plus généralement, en Typescript, on peut déclarer explicitement une constante C ou une variable V de type TYPE comme suit :

```typescript
const C: TYPE = VALUE; // Déclaration d'une constante C de type TYPE et de valeur VALUE
let   V: TYPE = VALUE; // Déclaration d'une variable V de type TYPE et de valeur VALUE
```

Vous pouvez [jouer avec le playground autour de cet exemple](https://www.typescriptlang.org/play?#code/DYUwLgBGD2MFwQM5gE4EsB2BzCBeCARAEbQYBW0ArigQNwBQAxqYtKAHTDRYAUUAngAcQ0AGZRY0CAEoGAejl4AfIWTpsBejBh4IAFgBMtCAogBRAEoWzAVQsAaAcMQRMzALaCAhmDRFQiEA)
