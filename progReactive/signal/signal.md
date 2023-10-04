# Définition d'un signal primaire

Un signal est une interface générique. Un signal produit des valeurs de type `T`.
On distingue les signaux primaires des signaux dérivés. Nous commençons par étudier les signaux primaires.

On peut définir un signal primaire comme étant un signal qui ne dépend d'aucun autre.
La bibliothèque de [signaux fournie par Angular](https://angular.io/guide/signals) permet de créer de tels signaux à l'aide de la fonction `signal<T>(v: T)`, qui renvoie un `WritableSignal<T>` (que nous appelons dans ce cours un signal primaire), par exemple :

```typescript
const sigNum    = signal<number>( 42 );
const sigString = signal<string>( "Hello" );

interface Person {
    name: string;
    age: number;
}
const sigPerson = signal<Person>( { name: "John", age: 42 } );
```

## Lire la valeur d'un signal

Pour lire la valeur d'un signal, il faut utiliser l'opérateur de fonction `()` sur ce signal. Par exemple :

```typescript
const num    : number = sigNum   ();
const str    : string = sigString();
const person : Person = sigPerson();
```

Une fois qu'on dispose d'un signal primaire, il est possible d'en changer la valeur de plusieurs façons : en la fixant par une nouvelle valeur, en mettant à jour la valeur ou en la mutant.

## Fixer la valeur

Les signaux primaires offre la méthode `set(v: T)` pour fixer la valeur du signal. Par exemple :

```typescript
sigNum   .set( 12 );
sigString.set( "World" );
sigPerson.set( { name: "Bob", age: 24 } );
```

## Mettre à jour la valeur

Les signaux primaires offre la méthode `update(f: (v: T) => T)` pour mettre à jour la valeur du signal par rapport à l'ancienne. Par exemple :

```typescript
sigNum   .update( v => v + 1 );
sigString.update( s => s + " !" );
sigPerson.update( p => ({ ...p, age: v.age + 1 }) );
```

Notez qu'avec `update` on renvoie une nouvelle valeur, en particulier si on manipule des objets ou des tableaux, on doit renvoyer un nouvel objet ou un nouveau tableau. On peut réécrire les appels ci-dessus avec la fonction set :

```typescript
sigNum   .set( sigNum   () + 1 );
sigString.set( sigString() + " !" );
sigPerson.set( { ...sigPerson(), age: sigPerson().age + 1 } );
```

L'avantage d'utiliser la méthode update est que les fonctions utilisées pour la mise à jour peuvent être réutilisées pour d'autres signaux.

```typescript
const inc = (v: number) => v + 1;

const sigN1 = signal<number>( 42 );
const sigN2 = signal<number>( 14 );
const sigN3 = signal<number>( 70 );

sigN1.update( inc );
sigN2.update( inc );
sigN3.update( inc );
```

## Mutations de la valeur

Pour des raisons de performance principalement, il peut arriver qu'on veuille muter une valeur, c'est à dire conserver la référence à l'objet mais modifier l'objet lui même (contraitrement à la mise à jour qui renvoie une nouvelle valeur, un nouvel objet). Pour cela, les signaux primaires offrent la méthode `mutate(f: (v: T) => void)`.

```typescript
sigPerson.mutate( p => v.age++ );
sigPerson.mutate( p => p.name = p.name.toUpperCase() );
```

## Propagation du changement

Notez bien que dans tous les cas de modification de la valeur vue précédemment (par set, par update ou par mutate), le changement est propagé à tous les observateurs du signal. C'est en particulier ce que nous allon voir avec les signaux dérivés dans la section suivante.
