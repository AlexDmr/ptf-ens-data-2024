# Définition d'un signal dérivé (ou signal calculé)

La grande force des signaux est de pouvoir définir des signaux dérivés (qu'on indifféremment appeler signaux calculés).
Un signal dérivé est un signal dont la valeur est calculée à partir d'un ou plusieurs autres signaux (ces signaux pouvant être eux-mêmes des signaux dérivés ou bien des signaux primaires).

Cela signifie qu'à chaque fois qu'un des signaux dont dépend un signal dérivé change de valeur, le signal dérivé est mis à jour. On dispose donc avec les signaux d'une base vraiment complète pour aborder la programmation réactive.

## Définition d'un signal dérivé

Un signal dérivé est définie par un appel à la fonction `computed<T>( () => T)` qui prend en paramètre une fonction qui calcule la valeur du signal dérivé à partir d'autres signaux. Par exemple :

```typescript
const a = signal<number>( 42 );
const n = signal<string>( "Bob" );

const p = computed<Person>( () => ({ name: n(), age: a() }) );
console.log( p() ); // { name: "Bob", age: 42 }

a.set( 24 );
console.log( p() ); // { name: "Bob", age: 24 }


n.set( "Alice" );
console.log( p() ); // { name: "Alice", age: 24 }
```

## Dépendance d'un signal dérivé

Dans l'exemple précédent, on a le graphe de dépendance suivant (rappel : chaque flèche x -> y représente le fait que le signal y est dépendant du signal x, c'est à dire qu'une mise à jour de la valeur de x aura un impact sur la valeur de y) :

<div style="text-align:center">
    <img src="local://assets/progReactive/signal/dependances.person.svg" alt="Graphe de dépendances entre les signaux n, a et p" style="max-width: min(100%, 300px);" />
</div>

## Les signaux dérivés sont en lecture seule

Il n'est pas possible de fixer la valeur d'un signal dérivé autrement qu'en modifiant les signaux dont il dépend.
Ainsi, un signal dérivé ne dispose pas de méthode `set`, `update` ou `mutate`.

## Les signaux dérivés sont des observables et des observateurs

Un signal dérivé est un observateur des signaux dont il dépend (par exemple `p` est un observateur de `n` et `a`).
Un signal dérivé est lui même un observable qui pourra être utilisé dans la définition d'autres signaux dérivés.

```typescript
const nb = signal<number>( 3 );
const Lp = computed<readonly Person[]>( () => {
    const res: Person[] = [];
    for( let i = 0; i < sigNb(); i++ ) {
        res.push( p() );
    }
    return res;
} );

console.log( Lp() ); // [ { name: "Alice", age: 24 }, { name: "Alice", age: 24 }, { name: "Alice", age: 24 } ]

a.update( age => 2 * age + 1 );
console.log( Lp() ); // [ { name: "Alice", age: 49 }, { name: "Alice", age: 49 }, { name: "Alice", age: 49 } ]

nb.set( 2 );
console.log( Lp() ); // [ { name: "Alice", age: 49 }, { name: "Alice", age: 49 } ]
```

Avec le graphe de dépendance suivant :

<div style="text-align:center">
    <img src="local://assets/progReactive/signal/dependances.ListPersons.svg" alt="Graphe de dépendances entre les signaux n, a et p" style="max-width: min(100%, 350px);" />
</div>
