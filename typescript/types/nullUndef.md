# null et undefined

Ce sont bel et bien deux types distinct en Typescript :

* `null` est un type à part entière qui ne peut prendre que la valeur `null`
* `undefined` est un type à part entière qui ne peut prendre que la valeur `undefined`

Notez bien que :

* `null` !== `undefined`
* Vous pouvez définir une variable de type `null`. Par exemple `let x: null = null;`
* Vous pouvez définir une variable de type `undefined`. Par exemple `let x: undefined = undefined;`

## Opérateur de nullish coalescing

L'opérateur nullish coalescing, noté **`??`**, est un opérateur binaire qui permet de définir une expression de type **`A ?? B`**, où **`A`** et **`B`** sont des expressions. Si A est évalué à `null` ou `undefined`, alors la valeur de l'expression **`A ?? B`** est **`B`**.

L'expression **`A ?? B`** est équivalente à l'expression ternaire suivante : 

```typescript
(A === null || A === undefined) ? B : A
```

Cet opérateur remplace avantageusement une pratique antérieur qui consistait à utiliser l'opérateur OU LOGIQUE (noté ||). En effet, il n'était pas rare de croiser des instructions comme :

```typescript
const C = A || B;
```

Le problème est que cette expression signifie : Si A peut être évalué à vrai alors C = A, sinon C = B. Or, en Typescript, dire qu'une expression est vraie (truthy) revient à dire qu'elle n'est pas fausse (falsy)... et ce qui est évaluable à faux peut être surprenant. Toutes les expressions listées ci-dessous sont évaluable à faux :

* false : On s'en doutait un peu...
* null : La valeur null
* undefined : La valeur undefined
* 0 : Zéro
* NaN : Not a Number
* "" : La chaîne vide
* document.all : Il s'agit d'un héritage lointain, cette expression a été utilisée par le passé pour détecter le navigateur et la spécification HTML. document.all est en réalité une HTMLAllCollection, il devrait donc être évalué à vrai, mais Javascript définit une infraction délibérée aux standards ECMAScript afin de garder une compatibilité ascendante.

Au final, l'expression **`A ?? B`** est bien plus "propre" car elle permet de ne considérer que les valeurs null ou undefined. A l'usage, cela évite bon nombre de bug et nous ne pouvons que vous encourager à l'utiliser.

## Note : truthy et falsy

En Typescript, une expression est dite "truthy" si elle peut être évaluée à vrai. A l'inverse, une expression est dite "falsy" si elle peut être évaluée à faux. Les expressions truthy et falsy sont utilisées dans les contextes où une expression booléenne est attendue. Par exemple, dans une condition d'un `if`, un ternaire ou d'un `while`.

De ce fait, on peut transformer n'importe quel expression en booléen en appliquant une ou deux fois l'opérateur unaire **`!`**.

* **`!A`** est équivalent à **`A ? false : true`**. A sera ici évalué dans le contexte du ternaire comme un truthy ou un falsy. **`!A`** sera donc évalué à `false` si A est truthy et à `true` si A est falsy.
* **`!!A`** est équivalent à **`A ? true : false`**. A sera ici évalué dans le contexte du ternaire comme un truthy ou un falsy. **`!!A`** sera donc évalué à `true` si A est truthy et à `false` si A est falsy.
