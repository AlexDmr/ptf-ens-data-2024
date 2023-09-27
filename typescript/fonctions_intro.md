# Les fonctions et leurs types
En Typescript, comme en Javascript, les fonctions sont des éléments de premier plan qui seront utilisés intensivement dans nos programmes. Nous vous invitons à lire [la documentation officielle](https://www.typescriptlang.org/docs/handbook/2/functions.html) à propos des fonctions.

Typescript permet, optionnellement, de déclarer explicitement le type des paramètres, ainsi que le type de la valeur de retour d'une fonction. Par exemple, une fonction qui prend en paramètre deux nombres et qui retourne leur somme peut s'écrire ainsi :

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

Une fonction qui prend un paramètre autant de string qu'on veut (de zéro à l'infini) et qui renvoie leur concaténation peut s'écrire ainsi :

```typescript
function concat(...L: string[]): string {
  let s = '';
  for (const v of L) {
    s += v;
  }
  return s;
}
```

Les fonctions ont elles-mêmes des types qu'on peut exprimer avec l'instruction type, (par exemple, on peut définir **T_NN_N** comme étant le type de la fonction **add**).  La figure ci-dessous illustre la syntaxe utilisée. Il est ensuite possible de définir une constante **f1**, de type **T_NN_N** et de l'assigner à la valeur **add**. La constante **f1** référence alors bien la fonction **add** et peut être utilisée de la même façon, le compilateur vérifiera que les paramètres sont corrects.

```typescript
type T_NN_N = (a: number, b: number) => number;
const f1: T_NN_N = add;
f1 === add;
f1(2, 3) === add(2, 3)
```

Notez que la notation pour décrire le type d'une fonction est proche de la notation fléchée utilisée pour les définir. Attention, cependant, dans le premier cas, on décrit le **TYPE** de la fonction ; dans le second cas, on décrit la **VALEUR** de la fonction (ses paramètres, son corps, sa valeur de retour). Par exemple, je peux définir **f2** comme une fonction de type **T_NN_N** dont la valeur est décrite par la fonction anonyme définie en notation fléchée par la valeur 
```typescript
(x: number, y: number) => x - y. 
```

Notez enfin que Typescript peut inférer les types. Par exemple, la fonction f3 est déclarée de type T_NN_N et est affectée à la valeur ***(a, b) => a * b***, Typescript va alors automatiquement forcer les types des paramètres **a** et **b** de cette fonction à  **number**, tout comme le type de retour. Ainsi, la fonction ***(a, b) => a * b*** est implicitement typée.

```typescript
const f2: T_NN_N = (x: number, y: number) => x - y;
const f3: T_NN_N = (a, b) => a * b;
```

### Note : Différence entre type et signature.

Le type d'une fonction est composée de la liste de ses arguments et de leur type, ainsi que du type de sa valeur de retour. 
La signature d'une fonction est composée de son type et de son nom.
Deux fonctions peuvent avoir le même type ; mais deux fonctions ne peuvent pas être définies dans la même portée avec la même signature.