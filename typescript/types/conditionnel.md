# Définir des types conditionnels
Il est possible de définir des types conditionnels, c'est à dire des types qui dépendent d'une condition. On peut utiliser cela lors de la définition de types génériques.

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

type AppendAttrToPoint<T extends string, U> = Point & {
    [att in T]: U
} 

const ptDescr: AppendAttrToPoint<'description', string> = {
    x: 2,
    y: 1,
    description: "coucou",
}

const pt3d: AppendAttrToPoint<'z', number> = {
    x: 2,
    y: 1,
    z: 5,
}
```

On peut aussi poser des condition sous la forme d'expressions ternaires.
```typescript
type Description<T> = T extends boolean ? {type: "un booléen"}
                                        : T extends number ? {type: "un nombre"}
                                                           : never // On n'autorise pas d'autres types 

let a: Description<number>
a = {type: "un booléen"} // pas OK
a = {type: "un nombre"}  // OK

let b: Description<string> // équivalent à never
b = {type: "un booléen"}   // pas OK
b = {type: "un nombre"}    // pas OK
```

On peut utiliser ces expressions ternaire pour "applatir" un tableau par exemple.
```typescript
type Flatten<T> = T extends any[] ? T[number] : T;

const L: number[] = [1, 2, 3];
const e: Flatten<typeof L> = 3;
```

Dans la même veine, on peut imaginer un DeepFlatten qui sera défini par un type récursif à base e ternaire.
```typescript
type DeepFlatten<T> = T extends unknown[] ? DeepFlatten<T[number]> : T;

const e2: DeepFlatten< number[][][][] > = 65;
```

Enfin, il est possible de demander d'inférer des types dans un bloc extends. Cela permet par exemple de ré-écrire DeepFlatten comme suit :
```typescript
type DeepFlatten<T> = T extends (infer U)[] ? DeepFlatten<U> : T;

const e2: DeepFlatten< number[][][][] > = 65;
```
