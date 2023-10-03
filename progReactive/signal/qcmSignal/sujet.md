# QCM signaux

On considère le système suivant :

```typescript
export type Person = {
    readonly name: string; 
    readonly age: number;
}

function sortByAge(a: Person, b: Person): number {
  return a.age - b.age;
}

function hasSubStringInName(p: Person, sub: string): boolean {
  return p.name.includes(sub);
}

const nb  = signal<number>(  2 )
const str = signal<string>( "" )
const L   = signal<Person[]>( [/* des personnes */] )
```

Soient les signaux dérivés suivants :

* **sel** : les personnes dont le nom contient str().
* **nbAgées** : les nb() personnes les plus agées dont le noms contient str()

## Cochez les réponses correctes

Il n'y a aucune erreur de syntaxe dans ce qui suit, concentrez vous sur la sémantique.
