# Les types littéraux
Un type littéral est un sous-type plus concret d'un type collectif. Typescript permet d'utiliser trois ensembles de types littéraux disponibles :

* les chaînes de caractères,
* les nombres
* les booléens ;

En utilisant les types littéraux, il est possible d'autoriser une valeur exacte que doit avoir une chaîne de caractères, un nombre ou un booléen.

**Il faut noter que les unions de string littérales peuvent replacer avantageusement, dans certains cas, les énumérations.**

Quelques exemples d'usages :
```typescript
// On peut numéroter et énumérer les faces possible d'un dès.
type Dice = 1 | 2 | 3 | 4 | 5 | 6;

// On peut définir des types d'animation
type Moment = "in" | "out" | "in-out"
type Easing = `ease-${Moment}`;

let animate: Easing = "ease-in"
animate = "ease-out"
animate = "ease-in-out";

// On peut définir des mesures, selon plusieurs unités possibles
type Unit = "px" | "cm" | "%";
type Size = `${number}${Unit}`;

let width: Size = "12px";   // OK
width = "  5 cm";           // OK
width = "hello px"          // pas OK
width = "0xFF %";           // OK
```
