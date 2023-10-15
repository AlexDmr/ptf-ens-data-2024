# Dériver des observables

Le coeur de la puissance de RxJS est de permettre de dériver et de combiner des observables pour en créer de nouveaux. En pratique, on se retrouve principalement à dériver des observables existants. Nous allons voir comment faire cela.

## La méthode pipe

La méthode **`pipe`** permet de dériver un observable en un autre observable. Elle prend en paramètre une liste d'opérateurs pipable. Un opérateur pipable est une fonction qui prend en paramètre un observable et renvoie un observable. Vous pouvez vous rendre sur [la documentation dédiée aux opérateurs](https://rxjs.dev/guide/operators#categories-of-operators) pour avoir une idée du nombre d'opérateurs existants. Quelques exemples proches de concepts que vous connaissez déjà :

### [L'opérateur **`map`**](https://rxjs.dev/api/operators/map)

L'opérateur RxjS **`map`** (à ne pas confondre avec la méthde map des tableaux) prend en paramètre un observable de type **`Observable<T>`** et renvoie un observable de type **`Observable<U>`**. Il permet de transformer les valeurs émises par l'observable en d'autres valeurs. Il est possible de lui passer une fonction de transformation **`T -> U`**.

```typescript
    // Exemple avec l'observable interval qui produit un entier toutes les N ms (N passé en paramètre, ici 1000).
    const source  = interval(1000);
    const derived = source.pipe(
        map(x => 10 * x)
    );
```

<figure style="text-align: center; margin: auto; max-width: min(100%, 600px);">
    <img  src="https://rxjs.dev/assets/images/marble-diagrams/map.png"
            alt=""
            style="width: 100%;"
            onerror="this.style.display = none"
            />
    <figcaption>
        Schéma de l'opérateur map, tiré de la [documentation RxJS](https://rxjs.dev/api/operators/map). En haut, l'observable source, en bas, l'observable dérivé de source par map.
    </figcaption>

</figure>

### [L'opérateur **`filter`**](https://rxjs.dev/api/operators/filter)

L'opérateur RxJS **`filter`** prend en paramètre un observable de type **`Observable<T>`** et renvoie un observable de type **`Observable<T>`**. Il permet de filtrer les valeurs émises par l'observable. Il est possible de lui passer une fonction de test **`T -> boolean`**.

```typescript
    const source  = interval(1000);
    const derived = source.pipe(
        filter(x => x % 2 === 0)
    );
```

<figure style="text-align: center; margin: auto; max-width: min(100%, 600px);">
        <img  src="https://rxjs.dev/assets/images/marble-diagrams/filter.png"
                alt=""
                style="width: 100%;"
                onerror="this.style.display = none"
                />
        <figcaption>
            Schéma de l'opérateur filter, tiré de la [documentation RxJS](https://rxjs.dev/api/operators/filter). En haut, l'observable source, en bas, l'observable dérivé de source par filter.
        </figcaption>
</figure>

### [L'opérateur **`scan`**](https://rxjs.dev/api/operators/scan) 

L'opérateur RxJS **`scan`** prend en paramètre un observable de type **`Observable<T>`** et renvoie un observable de type **`Observable<U>`**. Il permet de transformer les valeurs émises par l'observable en d'autres valeurs. Il est possible de lui passer une fonction de transformation **`T -> U`**. La différence avec **`map`** est que la fonction de transformation prend en paramètre la valeur courante et la valeur précédente. Cela permet de faire des calculs cumulatifs.

```typescript
    const source  = interval(1000);
    const derived = source.pipe(
        scan((acc, x) => acc + x, 0)
    );
```

<figure style="text-align: center; margin: auto; max-width: min(100%, 600px);">
        <img  src="https://rxjs.dev/assets/images/marble-diagrams/scan.png"
                alt=""
                style="width: 100%;"
                onerror="this.style.display = none"
                />
        <figcaption>
            Schéma de l'opérateur scan, tiré de la [documentation RxJS](https://rxjs.dev/api/operators/scan). En haut, l'observable source, en bas, l'observable dérivé de source par scan.
        </figcaption>
</figure>

### Chainer les opérateurs

Notez qu'il est bien sur possible de chainer ces opérateurs, par exemple, pour produire un observable qui émettra une string listant les la somme des carrés des entiers pairs à partir d'un observable interval à chaque nouvel entier pair.

```typescript
const source : Observable<number> = interval(1000);
const derived: Observable<number> = source.pipe(
    filter(x => x % 2 === 0),
    map(x => x * x),
    scan((acc, x) => [...acc, x], [])
    map( L => L.join(", ") )
);
```

Il existe de nombreux autres [opérateurs](https://rxjs.dev/api/operators), nous ne pourrons pas tous les présenter ici mais nous en introduirons petit à petit.

## Un parallèle entre observable et fonctions

Un dernier point avant de passer à la pratique. Dans cette page nous n'avons fait que **définir** des observables, nous ne les avons pas **appelé/utilisé**.

Les observables peuvent être vu comme[ une généralisation des fonctions](https://rxjs.dev/guide/observable#observables-as-generalizations-of-functions), une fonction vous renvoie une valeur, un observable vous renvoie un flux de valeurs. Vous pouvez effectivement faire le parallèle entre les deux :

* On peut définir une fonction sans l'appeler, on peut définir un observable sans s'y abonner.
* Si on appelle pas la fonction, le code qu'elle contient n'est pas exécuté. De même, si on ne s'abonne pas à l'observable, le code qu'il contient n'est pas exécuté.
* On appelle une fonction avec l'opérateur **`()`**, on *"appelle"* un observable en s'y abonnant.
* Une fonction peut être synchrones ou asynchrone, un observable peut être synchrone ou asynchrone. On parle d'observable synchrone lorsque les valeurs sont produites immédiatement et  et d'observable asynchrone lorsque les valeurs sont produites au cours du temps (par exemple, à interval régulier, ou en réaction à un événement).
