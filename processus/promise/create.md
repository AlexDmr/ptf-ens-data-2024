# Créer ses propres promesses

Il existe plusieurs façons de construire des promesses. Nous allons voir les principales.

## À partir d'une fonction asynchrone de type callback

La première est d'utiliser le constructeur de l'objet Promise. Ce constructeur prend en paramètre une fonction que nous appellerons **`λ`**. Cette fonction sera appelée par le constructeur de Promise. La fonction **`λ`** sera appelée avec deux paramètres qui sont deux fonctions, on les nomme usuellement **`resolve`** et **`reject`**.

Illustrons cela avec une version de la fonction **`jouerSon`** basée sur les promesses et que nous appelerons **`jouerSonP`**. On note que **`jouerSonP`** renvoie une **`Promise<void>`**, cela signifie que lorque **`jouerSonP`** terminera, il n'y aura pas de résultat à récupérer, la promesse sera simplement tenue ou rejetée.

```typescript
function jouerSonP(url: string): Promise<void> {
    // On utilise le constructeur de Promesse
    return new Promise( 
        // On peut définir en ligne la fonction λ, paramètre du constructeur de Promesse :
        (resolve, _reject) => jouerSon(url, resolve)
    );
}
```

On note ici que _reject n'est jamais appelé, en effet **`jouerSon`** ne peut pas échouer. Supposons qu'on ait eut une version **`jouerSon2`** qui puisse échouer et qu'on définisse comme suit :

```typescript
/**
 * jouerSon2 joue le son dont l'URL est passée en paramètre.
 * @param url du son à jouer
 * @param cbOK callback appelée si le son a été joué avec succès
 * @param cbKO callback appelée si le son n'a pas pu être joué 
 *             avec la raison de l'échec en paramètre
 */
function jouerSon2(url: string, cbOK: () => void, cbKO: (err: Error) => void): void;
```

Alors on pourrait écrire la fonction **`jouerSon2P`** comme suit :

```typescript
function jouerSon2P(url: string): Promise<void> {
    // On utilise le constructeur de Promesse
    return new Promise( 
        // On peut définir en ligne la fonction λ, paramètre du constructeur de Promesse :
        (resolve, reject) => jouerSon2(url, resolve, reject)
    );
}
```

## Construire des promesses déjà tenues ou rejetées

Il est parfois utile de pouvoir créer des promesses déjà tenues ou rejetées. Pour cela, l'objet Promise propose deux méthodes statiques :

* **`Promise.resolve`** qui prend en paramètre une valeur et renvoie une promesse tenue (c'est-à-dire à l'état fullfilled) contenant cette valeur (sauf si cette valeur est déjà la promesse d'une valeur, auquel cas elle est renvoyée directement).
* **`Promise.reject`** qui prend en paramètre une valeur et qui renvoie une promesse rejetée (c'est-à-dire à l'état rejected) contenant cette valeur. On conseille généralement de passer une instance de la classe Error en paramètre de cette méthode pour des raisons de cohérences.

## Construire une promesse à partir de plusieurs promesses

C'est un des atouts majeur des promesses, il existe des fonctions de combinaison de promesses qui permettent de construire une promesse à partir de plusieurs promesses. Ces fonctions sont au nombre de 5 :

1. [**`Promise.all`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) qui prend en paramètre un itérable (par exemple un tableau) de promesses et renvoie une promesse qui sera tenue si toutes les promesses de l'itérable le sont, qui sera rejetée sinon. Si la promesse est tenue, alors le résultat est un tableau contenant les résultats des promesses de l'itérable. Si la promesse est rejetée, elle le sera pour la même raison que la première promesse de l'itérable qui sera rejetée.

    ```typescript
    // On suppose qu'on dspose de la fonction suivante qui hallucine une image à partir d'un texte
    funtion hallucinateFrom(text: string): Promise<ImageData>;

    // Pour halluciner un tableau d'images à partir d'un tableau de textes, on peut écrire :
    function f(texts: readonly string[]): Promise<readonly ImageData[]> {
        return Promise.all( texts.map(hallucinateFrom) );
    }
    ```

2. [**`Promise.any`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) qui prend en paramètre un itérable (par exemple un tableau) de promesses et renvoie une promesse qui sera tenue si au moins une promesse de l'itérable est tenue, elle sera rejetée sinon. Si la promesse est tenue, alors le résultat est celui de la première promesse de l'itérable qui est tenue (fullfilled). Si la promesse échoue, alors le résultat est l'agrégation de toutes les raisons d'échec des promesses de l'itérable au sein d'un [AggregateError](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/AggregateError).

    ```typescript
    // Pour renvoyer la première hallucination tenue à partir d'un tableau de textes, on peut écrire :
    function f(texts: readonly string[]): Promise<ImageData> {
        return Promise.any( texts.map(hallucinateFrom) );
    }
    ```

3. [**`Promise.race`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) qui prend en paramètre un itérable (ex: un tableau) de promesses L et renvoie une promesse dont le résultat (tenue ou rejetée) dépendra de la première promesse **`P`** à sortir de l'état **`pending`**. **`Promise.race`** prendra alors son état (que **`P`** soit tenue ou rejetté) et sa valeur.

4. [**`Promise.allSettled`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) qui prend en paramètre un itérable (ex: un tableau) de promesses L et renvoie une promesse qui sera toujours tenue. Elle sera tenue au moment où toutes les promesses de L auront été résolues (qu'elles soient tenues ou rejetées). Elle aura pour valeur un tableau contenant des objets indiquant si la promesse correspondant dans L a été tenue ou pas :

    * En cas de succès, l'objet sera de la forme **`{status: "fulfilled", value: X}`**, avec **`X`** le résultat.
    * En cas d'échec, l'objet sera de la forme **`{status: "rejected", reason: X}`** avec **`X`** la raison de l'échec.

    ```typescript
    // La définition des types :
    interface PromiseFulfilledResult<T> {
        status: "fulfilled";
        value: T;
    }

    interface PromiseRejectedResult {
        status: "rejected";
        reason: any;
    }

    type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

    // Pour renvoyer le résultat de toutes les promesses d'hallucination (tenues ou rejetées)
    // à partir d'un tableau de textes, on peut écrire :
    function f(texts: readonly string[]): PromiseSettledResult<ImageData[]> {
        return Promise.allSettled( texts.map(hallucinateFrom) );
    }
    ```
