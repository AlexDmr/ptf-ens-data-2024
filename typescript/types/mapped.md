
# Manipuler des types mappés

Un type mappé construit un objet à partir d'un autre type en appliquant une transformation à chaque attribut de ce type. On peut utiliser les types mappés pour créer des types d'objets à partir de types d'objets existants en appliquant une transformation à chaque attribut de l'objet.

Redéfinissons, par exemple, le type paramétrique `allOptional` qui permet de rendre optionnels tous les attributs d'un type d'objet.

```typescript
interface Person {
    readonly name: string;
    readonly forename: string;
    readonly birthday: Date;
    readonly size: number;
}

type allOptionnal<T extends object> = {
    [k in keyof T]?: T[k] // On itère sur les attribut de T et on les rend optionnel. Le type des attributs reste inchangé
}

let partiePersonne: allOptionnal<Person>;
partiePersonne = {}                       // OK
partiePersonne = {name: "Bob", size: 180} // OK
partiePersonne = {toto: "xxx"}            // pas OK
```

Plus difficile, définissons le type paramétrique `allOptionalExcept` qui permet de rendre optionnels tous les attributs d'un type objet, sauf ceux qui sont énumérés dans le type passé en paramètre. On utilise ici l'intersection de type (opérateur `&`), c'est l'un des rares cas où l'intersection de type est utile. On réalise l'intersection de deux types mappés, l'un définissant les attributs qui doivent être présents et l'autre les attributs qui sont optionnels.

Notons que nous utilisons pour cela le type `Exclude` qui permet de retirer des attributs d'un type et qui est défini dans la bibliothèque standard de TypeScript.

```typescript
type allOptionnalExcept<T extends object, A extends (keyof T)[]> = {
    [k in Exclude<keyof T, A>]?: T[k];
} & {
    [k in A[number]]-?: T[k];
}

let p1: allOptionnalExcept<Person, ['name', 'forename']> // OK
let p2: allOptionnalExcept<Person, ['name', 'toto']>     // pas OK car toto n'est pas un attribut de Person

p1 = {
    name: "bob",
    forename: "kelso"
}

p1 = {
    name: "bob",
    forename: "kelso",
    birthday: new Date("1960-05-15")
}
```
