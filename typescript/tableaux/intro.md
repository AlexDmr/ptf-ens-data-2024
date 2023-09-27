# Tableaux, fonctions d'ordres supérieurs
La documentation à propos des tableaux est succincte dans Typescript, mais on peut se référer sans problème à [la documentation de MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array). La déclaration d'une variable **tab** de type tableau de **TYPE** se fait à l'aide des crochets qui suffixent le type :

```typescript
let tab: TYPE[];
```

Tout comme en Javascript, les tableaux sont richement pourvus de méthodes de modifications. Parmi elles, les méthodes [map](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/map), [reduce](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce), [filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter) font partie des classiques des algorithmes à connaître sur les tableaux. Outre la manipulation de tableaux, elles nous permettront de parler de fonctions d'ordre supérieur et d'aborder les types génériques.

## Attention à l'initialisation
Comme dans les autres langages, déclarer un tableau n'est pas suffisant. Il faut penser à l'initialiser ! Le compilateur lèvera une erreur si vous essayez d'utiliser une variable non initialisée.
 Les tableaux disposent de nombreuses méthodes (voir [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array)). On donne ici un exemple :

```typescript
let tab1: string[] = [];
let tab2: number[] = [3, 65, 74];

const val74 = tab2.pop(); // renvoie 74 et retire le dernier élément de tab2

tab1.push( 'on ', 'peut ', 'ajouter plusieurs éléments ', 'à la fois' );
```
