# Union et intersection de types

## L'union de types

Une union de type décrit une valeur qui peut avoir un type parmi plusieurs. La notation pour définir les unions de types est la barre verticale (|) qui sert à séparer chaque type de l'union.

```typescript
type MARGIN = number | string;
const m1: MARGIN = 12;
const m2: MARGIN = "12px";
```

## L'intersection de types

Les types intersections sont étroitement liés aux types unions, mais ils sont utilisés de manière très différente. Un type d'intersection combine plusieurs types en un seul. Cela permet d'additionner les types existants pour obtenir un seul type qui possède toutes les caractéristiques requises. Par exemple, Personne & Sérialisable & Loggable est un type qui est tout à la fois Personne et Sérialisable et Loggable. Cela signifie qu'un objet de ce type aura tous les membres des trois types. La notation pour utiliser l'intersection de type est le **`&`**.

L'intersection de types peut parfois être utile pour caractériser rapidement des variables ou du code JavaScript. Cependant, nous vous conseillons plutôt d'utiliser des interfaces dans ce cours.
