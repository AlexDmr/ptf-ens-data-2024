# Créer ses propres promesses

Il existe plusieurs façons de construire des promesses. Nous allons voir les principales.

## À partir d'une fonction asynchrone de type callback

La première méthode consiste à utiliser le constructeur de l'objet Promise. Ce constructeur prend en paramètre une fonction que nous appellerons **`λ`**. Cette fonction sera appelée par le constructeur de Promise et prend deux paramètres, conventionnellement nommés **`resolve`** et **`reject`**, qui sont des fonctions.

Illustrons cela avec une version de la fonction **`jouerSon`** basée sur les promesses que nous appellerons **`jouerSonP`**. Il est à noter que **`jouerSonP`** renvoie une **`Promise<void>`**, ce qui signifie que lorsque **`jouerSonP`** se termine, il n'y aura pas de résultat à récupérer ; la promesse sera simplement tenue ou rejetée.

```typescript
function jouerSonP(url: string): Promise<void> {
    // On utilise le constructeur de Promesse
    return new Promise( 
        // On peut définir en ligne la fonction λ, paramètre du constructeur de Promesse :
        (resolve, _reject) => jouerSon(url, resolve)
    );
}
```

On note ici que `_reject` n'est jamais appelé, car en effet **`jouerSon`** ne peut pas échouer. Supposons qu'on ait une version **`jouerSon2`** qui puisse échouer, et qu'on la définisse comme suit :

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

- **`Promise.resolve`** : Prend en paramètre une valeur et renvoie une promesse tenue (c'est-à-dire à l'état fullfilled) contenant cette valeur (sauf si cette valeur est déjà la promesse d'une valeur, auquel cas elle est renvoyée directement).
- **`Promise.reject`** : Prend en paramètre une valeur et renvoie une promesse rejetée (c'est-à-dire à l'état rejected) contenant cette valeur. On conseille généralement de passer une instance de la classe Error en paramètre de cette méthode pour des raisons de cohérence.

## Construire une promesse à partir de plusieurs promesses

## Combinaison de promesses

Les promesses offrent des fonctions de combinaison qui permettent de construire une promesse à partir de plusieurs autres promesses. Voici les principales :

1. [**`Promise.all`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) : Prend en paramètre un itérable (par exemple un tableau) de promesses et renvoie une promesse qui sera tenue si toutes les promesses de l'itérable le sont, sinon elle sera rejetée. Si la promesse est tenue, le résultat est un tableau contenant les résultats des promesses de l'itérable. En cas de rejet, la raison du rejet sera celle de la première promesse de l'itérable qui aura été rejetée. Cette méthode permet de gérer la synchronisation de plusieurs promesses.

    ```typescript
    // Exemple : Halluciner un tableau d'images à partir d'un tableau de textes
    function f(texts: readonly string[]): Promise<readonly ImageData[]> {
        return Promise.all(texts.map(hallucinateFrom));
    }
    ```

2. [**`Promise.any`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) : Prend en paramètre un itérable (par exemple un tableau) de promesses et renvoie une promesse qui sera tenue si au moins une promesse de l'itérable est tenue, sinon elle sera rejetée. Si la promesse est tenue, le résultat est celui de la première promesse de l'itérable qui est tenue. En cas d'échec, le résultat est l'agrégation de toutes les raisons d'échec des promesses de l'itérable dans un [AggregateError](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/AggregateError).

    ```typescript
    // Exemple : Renvoyer la première hallucination tenue à partir d'un tableau de textes
    function f(texts: readonly string[]): Promise<ImageData> {
        return Promise.any(texts.map(hallucinateFrom));
    }
    ```

3. [**`Promise.race`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) : Prend en paramètre un itérable (par exemple un tableau) de promesses et renvoie une promesse dont le résultat (tenue ou rejetée) dépendra de la première promesse à sortir de l'état **`pending`**. Le résultat de la promesse sera celui de la première promesse qui est résolue (qu'elle soit tenue ou rejetée).

4. [**`Promise.allSettled`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) : Permet de gérer la synchronisation de plusieurs promesses (qu'elles soient tenues ou rejetées). Elle prend en paramètre un itérable (par exemple un tableau) de promesses et renvoie une promesse qui sera toujours tenue. Elle sera tenue lorsque toutes les promesses de l'itérable auront été résolues (qu'elles soient tenues ou rejetées). Son résultat est un tableau contenant des objets indiquant si chaque promesse de l'itérable a été tenue ou non :

    - En cas de succès, l'objet sera de la forme **`{status: "fulfilled", value: X}`**, où **`X`** est le résultat.
    - En cas d'échec, l'objet sera de la forme **`{status: "rejected", reason: X}`**, où **`X`** est la raison de l'échec.

    ```typescript
    // Définition des types
    interface PromiseFulfilledResult<T> {
        status: "fulfilled";
        value: T;
    }

    interface PromiseRejectedResult {
        status: "rejected";
        reason: any;
    }

    type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

    // Exemple : Renvoyer le résultat de toutes les promesses d'hallucination (tenues ou rejetées)
    function f(texts: readonly string[]): PromiseSettledResult<ImageData[]> {
        return Promise.allSettled(texts.map(hallucinateFrom));
    }
    ```
