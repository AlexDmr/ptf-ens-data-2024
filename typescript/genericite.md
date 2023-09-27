# La généricité
La généricité permet de définir des interfaces, des classes ou des fonctions en paramétrant certains types utilisés dans leurs définitions. Un exemple classique est [la structure de pile](https://fr.wikipedia.org/wiki/Pile_(informatique)) qui peut être définie indépendamment du type d'éléments empilés. En Typescript, la syntaxe utilisée est proche de celle des generics en Java. Dans l'exemple ci-dessous, l'interface Pile est générique, c'est-à-dire qu'elle est paramétrée (ici, par le type **T**). 
```typescript
interface Pile<T> {
  empiler(e: T): void;
  dépiler(): T;
}

let P: Pile<number> = ...;
const e: number = P.dépiler();
```

Typescript propose quelques types génériques utilitaires tels que Partial et Readonly qui sont très utiles. En voici la définition (tirée de Typescript).

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

Si nous reprenons le cas du point, nous pouvons, par exemple, utiliser ces types génériques de la sorte :

```typescript
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/*
 * Les attributs des paramètres pt1 et pt2 sont accessibles en lecture seule
 */
function milieu(pt1: Readonly<Point3D>, pt2: Readonly<Point3D>): Point3D {
  return {
    x: (pt1.x + pt2.x) / 2,
    y: (pt1.y + pt2.y) / 2,
    z: (pt1.z + pt2.z) / 2
  };
}

/*
 * Les attributes des paramètres pt et up sont accessibles en lecture seule
 * up est un Point3D partiel, cela signifie qu'on peut le définir avec une partie des attributs de Point3D seulement
*/
function getUpdatedPoint(pt: Readonly<Point3D>, up: Readonly<Partial<Point3D>>): Point3D {
  return {...pt, ...up}; // On utilise la destructuration pour produire le nouveau point
}

// Exemple d'usage
const pt1: Point3D = {x: 0, y: 0, z: 0};
const pt2: Point3D = {x: 2, y: 3, z: 4};
const ptM = milieu(pt1, pt2);
const pt3 = getUpdatedPoint(ptM, {y: 7});
```

<div style="border: solid blue 2px; border-radius: 1em; padding: .5em;">
<h3 style="display: inline">Note : </h3>Le but de ce cours n'est pas d'apprendre à utiliser la généricité en profondeur mais d'être familier avec le concept car vous le rencontrerez régulièrement en Typescript. Pour une description plus complète de la généricité en Typescript, vous pouvez vous référer à <a href="https://www.typescriptlang.org/docs/handbook/generics.html">la documentation officielle</a>.
</div>