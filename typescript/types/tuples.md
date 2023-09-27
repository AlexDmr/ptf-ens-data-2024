# Les tuples
Les tuples sont des tableaux de taille fixe dont les éléments peuvent être de types différents. Chaque élément d'un tuple a un type précis. Cela permet au compilateur de vérifier qu'on accède a un index existant dans le tuple.

```typescript
type DATA = [string, number, boolean];
const p: DATA = ['', 0, false];

p[3]; // Erreur, le tuple DATA n a pas d element a l index 3.
```

Il est possible de nommer les index d'un type tuple, afin de rendre les choses plus lisibles pour le programmeur.

**Il est à noter que les tuples peuvent être mis en correspondance avec la liste des paramètres d'une fonction**. La liste des paramètres d'une fonction est, en effet, un tuple dont les membres sont nommés.

```typescript
type monTupleNamed = [age: number, forneame: string, name: string, birthday: Date];
function F(...p: monTupleNamed): monTupleNamed {
  return p;
}
const rec1: monTupleNamed = [56, 'Bob', 'Kelso', new Date()];
const rec2: monTupleNamed = F(23, 'p', 'n', new Date());
const rec3: monTupleNamed = F(...rec1);
```

Autre exemple
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
function f(i: number, s: string, b: boolean, pt: Point): Point {
    /* ...CODE... */
}

let p: Parameters<typeof f>;
p = [1, "coucou", true, {x: 2, y: 3}];  // OK
p = ["coucou", 1, false, {x: 2, y: 3}]; // pas OK

f(p);    // pas OK, les arguments doivent être passés sous forme de tuple destructuré.
f(...p); // OK
```

Vous pouvez vous exercer avec le terrain de jeu ci-dessous :
<iframe style="width: 100%; height: 600px;" src="https://www.typescriptlang.org/play?#code/C4TwDgpgBAtg9gOwCoFcwBsIDkCGMIAmUAvFANo4DmEAXFAijAEYQBOANFAGZysIR5aUAM7BWASwSVOCQXVESpnJuNbAAFgRwg6AERzAIAXQDcAKC4oEAY2DjEUAGIAKAHTuwdeMjSZc+AgBKL0RUDGxBIgBvMygoVghgFD4oMHMAXzNrRFF4iGsARhCfcP9CEnIAVgA2TgByACE4Jjr6gGkIdGE4VvoIAHcofUNnQNMsnOA86wAmYrC-SIqXGYBmerBeuoRe-kHhiFHA82yEXITrVfnfCIDlt3cLguOzM0lDVi4ca2gABTh3lAYnE4gkcAREOgQFAAB50BjMNjmEF5cGQ6E6eiMFisDIWKy2ewIbjOcTw7FsTjCeRiSTSKBMOhMOBwTA4BCcMDAOj-d7BKC8hBTYEghJJFJcvFmTBTTwCnCsQQfYQAHlAkDgXG4AD5zGAKmQCpwAETZFBm42cMQoCCcKJwqAzTiY1bpUxxAD0HqgAHk2mZ9aQyKa4ObQ5aoEbuDguragQ6nVAXW6TFAvakcMJff6LM4wMcUemwJns5xMFmFZRGBAhVmIeIAG41qYAK7E0GLwmEAEus90UFmeKx8FACNAkuFRxAFObxd3XLn3K586n037XkA" />