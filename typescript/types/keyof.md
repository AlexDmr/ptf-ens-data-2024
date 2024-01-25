# Obtenir le type des attributs d'un type objet avec keyof

L'opérateur keyof s'applique à des types objets, il renvoie l'union des attributs de l'objet en question.

```typescript	
interface Point {
    readonly x: number;
    readonly y: number;
}

type Att = keyof Point; // équivalent à type Att = 'x' | 'y'
let a: Att;
a = 'x' // OK
a = 'y' // OK
a = 'z' // Pas OK
```

Les tableau étant des objets particulier, on peut utiliser keyof avec les types tableau.

```typescript
type AttTabNumber = keyof number[];
let z: AttTabNumber;
z = 45       // Car les entier sont attribut des tableaux pour indexer les éléments
z = 'length' // Car length est un attribut des tableau
z = "concat" // Car concat est une méthode des tableau
z = "toto"   // pas OK car toto n'est ni un attribut ni une méthode des tableaux.
```
