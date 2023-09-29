# La méthode reduce

La méthode **reduce** est très généraliste. Son principe est d'accumuler une valeur en parcourant le tableau et de renvoyer cette valeur accumulée à la fin. La façon d'accumuler la valeur lors du parcours est spécifiée par une fonction passée en paramètres. Enfin, il est possible - mais pas obligatoire - de fixer une valeur initiale d'accumulateur.

La méthode reduce peut être décrite par deux signatures, telles qu'exposées ci-dessous.

```typescript
interface Array<T> {
  reduce   (f: (acc: T, v: T, i: number) => T, initialValue?: T): T;
  reduce<U>(f: (acc: U, v: T, i: number) => U, initialValue : U): U;
}
```

Si l'on suppose le tableau de type T, alors :

* La fonction d'accumulation f prend en paramètre l'accumulateur (qui peut être de type T ou de type U), la valeur courante dans le tableau et l'indice de la valeur courante. La fonction f renvoie la nouvelle valeur de l'accumulateur qui sera utilisée au prochain appel ou, si le parcours du tableau est terminé, qui sera le résultat du reduce.
* Si reduce renvoie une valeur accumulée de type T, elle peut être appelée avec une valeur initiale d'accumulation ou non. Si elle l'est, alors la fonction d'accumulation sera appelée à partir de l'indice 0 du tableau. Si elle ne l'est pas, la valeur d'accumulation initiale est la valeur du premier élément du tableau (indice 0) et la fonction f est appelée à partir de l'élément d'indice 1.
* Si reduce renvoie une valeur de type U (U différent de T), alors il est nécessaire de spécifier une valeur d'accumulateur initiale. La fonction f sera appelée à partir du premier élément du tableau.

## Exemple : Somme des nombres d'un tableau

Vous pouvez visualiser pas à pas l'exécution de reduce pour le cas où la fonction d'accumulation somme les éléments d'un tableau de nombres. Notez que puisqu'aucune valeur initiale de l'accumulateur n'est fournie, cette dernière est initialisée avec la valeur de la première case du tableau et le parcours démarre à partir de la deuxième case.

<iframe src   = "https://theme-ihm-reduce.web.app/reduce?f=return+acc+%2B+v"
        style = "width: 100%; height: 300px;"
        ></iframe>

## Exemple : Inverser un tableau

Reduce est une fonction très généraliste. On peut tout faire avec. Par exemple, produire un tableau inverse (éléments dans l'ordre inverse). On note ici qu'il est nécessaire de fournir une valeur initiale pour l'accumulateur (ici, un tableau vide) car reduce ne renvoie pas un nombre mais un tableau de nombres.

<iframe src   = "https://theme-ihm-reduce.web.app/reduce?f=return%20%5Bv,%20...acc%5D;&acc=%5B%5D"
        style = "width: 100%; height: 300px;"
        ></iframe>

## Exemple : string de longueur minimum

La fonction reduce va ici être utilisée pour trouver le mot de longueur minimum dans un tableau. L'accumulateur contient le mot de longueur minimum courant. On ne fournit pas de valeur initiale explicitement, celle ci est donc la valeur de la première case du tableau et on commence l'itération à partir de la seconde case, d'indice 1.

<iframe src   = "https://theme-ihm-reduce.web.app/reduce?f=return%20acc.length%20<%20v.length%20%3F%20acc%20:%20v;&t=%5B%22coucou%22%2C+%22oui%22%2C+%22quoi%3F%22%2C+%22h%C3%A9%22%2C+%22comment+%C3%A7a+%3F%22%2C+%22arf%22%5D"
        style = "width: 100%; height: 300px;"
        ></iframe>
