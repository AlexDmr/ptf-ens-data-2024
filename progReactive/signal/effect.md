# Signaux et effets

La bibliothèque de signaux fournie enfin des effets.
Un effet est défini par une fonction sans paramètre ni valeur de retour utilisant des signaux.
Cette fonction sera exécutée à chaque fois qu'un des signaux dont elle dépend est mis à jour. Cette fonction est enregistrée en tant qu'effet à l'aide de la fonction `effect` :

```typescript
const a = signal<number>( 42 );
const n = signal<string>( "Bob" );

effect( () => console.log( n(), a() ) );
// affiche dans la console "Bob 42"

a.set( 24 );
// affiche dans la console "Bob 24"

n.set( "Alice" );
// affiche dans la console "Alice 24"
```

## Différence entre un signal dérivé et un effet

De prime abord, un effet ressemble à un signal dérivé.
Cependant, ces deux notions sont fondamentalement différentes :

* Un signal dérivé produit des valeurs, il est à la fois un observateur des signaux dont il dépend et peut servir d'observable pour d'autres signaux dérivés ou pour des effets.
* Un effet ne produit pas de valeur, il est uniquement un observateur des signaux dont il dépend.

## Pourquoi et quand utiliser des effets ?

Le terme effet provient de la programmation fonctionnelle (comme beaucoup de choses que nous verrons dans ce cours). Il signifie qu'on défini un effet de bord, c'est à dire qu'on va modifier l'état de quelque chose (la console, localStorage, le DOM, le réseau, etc.).

On utilisera donc des effets lorsqu'on veut modifier l'état de quelque chose en fonction de la valeur des signaux. Nous verrons qu'Angular utilise des effets pour modifier le DOM en fonction de la valeur des signaux. En pratique, en utilisant Angular, vous n'aurez que très rarement besoin d'utiliser des effets, Angular les gèrera pour vous.
