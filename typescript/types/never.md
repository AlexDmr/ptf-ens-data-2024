# Le type never
Le type never représente le type des valeurs qui ne seront jamais produites. Cela est utile pour caractériser le type de valeur de retour de fonctions qui lèveront des exceptions ou qui ne terminent jamais (voir [la documentation](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)).

Dans l'exemple ci dessou, la fonction **ohNo** renvoie never, cela indique que la fonction ne terminera jamais, ainsi, tout code placé après un appel à cette fonction sera considéré par le compilateur comme un code mort.

```typescript
function ohNo(): never {
    throw "Oh no !"
}

console.log("on passer ici...")
ohNo();
// Le compilateur détecte que ce code est mort car throwException renvoie never
console.log("...mais jamais là")
```

Dans l'exemple suivant, on défini le type Format comme étant soit une donnée de type number ou string (un format est soit un number, soit un string). On peut alors imaginer la fonction **whatFormat** qui prend un paramètre **f** de type **Format** et renvoie une chaine de caractère. Dans cette fonction, on peut énumérer les cas de format possible dans un **switch** et vérifier qu'on a oublié aucun cas en affectant **f** à une constante de type never, ce qui n'est possible à cet endroit précis que si le compilateur est certain que **f** ne peut pas être de type Format et qu'il est donc de type never.

```typescript
type Format = number | string;

function whatFormat(f: Format): string {
    switch (typeof f) {
        case "number": return "c'est un nombre"
        case "string": return "c'est une string";
        default: 
            // On affecte f ) à v qui est de type never.
            // C'est possible seulement si f est de type never.
            // Ici le compilateur détecte que c'est nécessairement le cas.
            const v: never = f;
            return "c'est impossible d'être ici si f est bien de type Format";
    }
}
```


