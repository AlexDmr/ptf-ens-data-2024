# Lien avec les signaux et les promesses

Les observable RxJS offrent une grande souplesse pour définir des flux de données, nous avons vu dans l'exercice précédent qu'il était possible de transformer un observable RxJS en signal. Nous allons maintenant détailler comment les faire intéropérer avec les promesses et les signaux.

## 1) Transformer un observable RxJS en signal

La fonction [`toSignal`](https://angular.io/api/core/rxjs-interop/toSignal) permet de transformer un observable RxJS en signal. Elle permet de faire le lien entre ces deux approches qui n'ont pas les mêmes requis :

* Un observable RxJS peut être synchrone ou pas, alors que les signaux sont toujours synchrones.
* En conséquence, un signal a toujours une valeur. En particulier, un signal DOIT être initialisé avec une valeur. Un observable RxJS peut ne pas avoir de valeur initiale et ne produire sa première valeur que plus tard.

La fonction `toSignal` prend en paramètre l'observable RxJS à transformer ainsi qu'un objet optionnel qui permet de préciser la façon dont le signal sera initialisé avec les valeurs produites par l'observable. Sans entrer dans toutes les subtilités possible, nous illustrons les cas suivants :

* Si on accepte que le signal puisse ne pas être initialisé avec une valeur de type T produite par l'observable, alors on peut construire un signal qui produira des données de type `T | undefined` :

    ```typescript
    let obs: Observable<T> = ...;
    const sig: Signal<T | undefined> = toSignal(obs);
    ```

* Si on veut que le signal soit de type T sans possibilité d'être undefined, alors une première solution est de fournir une valeur initiale au signal. Cette valeur initiale sera utilisée si l'observable ne produit pas de valeur avant que le signal soit initialisé :

    ```typescript
    let obs: Observable<T> = ...;
    let v: T = ...;
    const sig: Signal<T> = toSignal(obs, {initialValue: v});
    ```

* Si il n'est pas possible de définir à l'avance cette valeur initial mais qu'un sait que l'observable émettra de manière synchrone sa première valeur, alors on peut utiliser l'option `requireSync` :

    ```typescript
    let obs: Observable<T> = ...;
    const sig: Signal<T> = toSignal(obs, {requireSync: true});
    ```

    Il faut noter quand dans ce cas, le compilateur ne peut pas vérifier que l'observable émettra bien sa première valeur de manière synchrone. Une vérification sera donc faite à l'exécution et une erreur sera levée si ce n'est pas le cas.

## 2) Transformer un signal en observable RxJS

Il est aussi possible de procéder à la mise en correspondance dans l'autre sens : produire un observable à partir d'un signal. On utilise alors la fonction [**`toObservable`**](https://angular.io/guide/rxjs-interop#toobservable). La sémantique est ici simple, l'observable produit est synchrone et produit une valeur initiale qui est la valeur courante du signal. Ensuite, l'observable produit les valeurs émises par le signal.

```typescript
let sig: Signal<T> = ...;
const obs: Observable<T> = toObservable(sig);
```

## 3) Transformer un observable RxJS en promesse

Tout comme pour les signaux, il est possible de transformer un observable RxJS en promesse. On peut utiliser une de ces deux fonctions :

* [**`firstValueFrom`**](https://rxjs.dev/deprecations/to-promise#firstvaluefrom) : qui prend en paramètre un `Observable<T>` et renvoie une `Promise<T>`. La promesse sera résolue avec la première valeur produite par l'observable. Si l'observable ne produit pas de valeur (termine avec ou sans erreur et sans avoir produit de valeur), la promesse sera rejetée avec une erreur.
* [**`lastValueFrom`**](https://rxjs.dev/deprecations/to-promise#lastvaluefrom) : qui prend en paramètre un `Observable<T>` et renvoie une `Promise<T>`. La promesse sera résolue avec la dernière valeur produite par l'observable avant sa terminaison. Si l'observable ne produit pas de valeur (termine avec ou sans erreur et sans avoir produit de valeur), ou si l'observable termine par une erreur, alors la promesse sera rejetée avec une erreur.

## 4) Transformer une promesse en observable RxJS

Enfin, il est possible de transformer une promesse en observable RxJS. On utilise alors la fonction [**`from`**](https://rxjs.dev/api/index/function/from). Cela produit alors un observable asynchrone qui produira la valeur de la promesse et terminera ensuite (ou bien terminera par une erreur si la promesse échoue).

```typescript
let p: Promise<T> = ...;
const obs: Observable<T> = from(p);
```

Notez qu'il est parfois possible d'utiliser directement des promesses avec certains opérateurs. C'est le cas par exemple de switchMap, que nous avons déjà vu précédemment dans l'exemple du chronomètre. Si la fonction de paramétrage de switchMap renvoie une promesse, alors l'observable produit par switchMap produira la valeurs de la promesse.

```typescript
let obs: Observable<T> = ...;
const obs2: Observable<U> = obs.pipe(
    switchMap( async x => new Promise<U>(...))
);
```
