# Obtenir un type à partir d'un autre type ou d'une valeur
Nous allons voir ici comment obtenir le type d'une valeur avec l'opérateur typeof, comment obtenir le type d'un attribut d'un type objet avec l'opérateur crochet **\[ \]** appliqué à un type et enfin comment obtenir le type des attributs d'un type objet avec l'opérateur **keyof**.
## Obtenir le type d'une variable ou constante avec **typeof**
typeof est à la fois une instruction et un opérateur de type.
En tant qu'instruction, typeof vous renvoie une chaine de caractère indiquant le type d'un objet, c'est une instruction issue du Javascript.

Typescript introduit **l'opérateur typeof** qui va permettre de définir le type d'un objet au sens Typescript du terme, il est différent en cela de l'instruction typeof (qu'il est encore possible d'utiliser en Typescript). L'opérateur typeof est utilisé dans les contextes où un type est attendu, par exemple dans une déclaration de variable ou de constante.

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const pt1: Point = {x: 2, y: 5};
const pt2: typeof pt1 = {x: 4, y: 1}

// Attention l'opérateur typeof sur les types est différent de l'instruction typeof
const pt3 = typeof pt1;         // pt3 vaut la string "object", on utilise ici l'instruction typeof
const pt4 : typeof pt1 = pt2;   // pt4 est du même type que pt1, un Point
```

<!-- <iframe style="width: 100%; height: 500px" src="https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgAoHtRmQbwFDKHJQRwAm6IANgJ7IAeAXMiAK4C2ARtANwFElylWshrM2XXngC+ePAkoBnbAAcwARmYYsyALy4myAEwAaUcwCs0vgpDLkao8zA0VEdDAca9B5gBYzMWR1WTwAejDkAEEwSHBgSmQqAHJ0FQBLqDhIVihkFzcPZEVcpIhFfNdy5HLsMmAYGEyIcGQyFBTQZShWBDAEkErCmHklVTAAZh8C9081dR5kCK8pgDc4VmwqOGKwKFAAc2QAInROACsIPuPRu3G-ZGcqovmfRz5bxXQqCAA6KnQBwAFPMAJSfb5-AHAxzg2xfH7-QEgyZwpSQpEwsB+cFAA" > </iframe> -->

## Obtenir le type d'un attribut d'un type objet
Vous pouvez extraire le type d'un attribut d'un type objet avec l'opérateur avec l'opérateur crochet **\[ \]**.

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

interface Triangle {
    readonly pt1: Point;
    readonly pt3: Point;
    readonly pt2: Point;
}

const abscisse: Point["x"] = 4;
const pt_a: Triangle["pt1"] = {x: 2, y: 2}
const ordonnee: Triangle["pt1"]["y"] = 5;
```

## Obtenir le type d'un attribut de type tableau ou tuple
Toujours à l'aide de l'opérateur crochet appliqué à un type, il est possible de récupérer le type des éléments d'un tableau ou d'un tuple.

```typescript
// Pour un tuple
type monTupleNamed = [age: number, forneame: string, name: string, birthday: Date];

const unAge: monTupleNamed[0] = 23;
const unNom: monTupleNamed[2] = "Bob";
const uneDate: monTupleNamed[3] = new Date();

// Pour un tableau
type tabNumber = number[];
const x : tabNumber[number] = 5;

const tab: number[] = [1, 2, 3];
const y: (typeof tab)[number] = 5;

type tabTruc = (number | string | boolean)[]
let truc: tabTruc[number];
truc = 15       // OK
truc = "coucou" // OK
truc = false    // OK
truc = [15]     // pas OK
```
