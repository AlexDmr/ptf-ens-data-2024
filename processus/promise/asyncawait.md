# Promesses et notation async / await

Nous avons vu que l'utilisation des promesses permettait de simplifier l'écriture de code asynchrone, en particulier lorsque des synchronisations doivent être exprimées. Le code ainsi produit est plus lisible et s'exprime dans un style fonctionnel, mais reste de ce fait encore assez différent d'un code synchrone impératif classique.

Pour simplifier encore l'usage des Promesses et la rapprocher de l'écriture de code synchrone, JavaScript a introduit deux nouveaux mots-clefs : **`async`** et **`await`** :

* **`await`** est un mot clef qui s'utilise devant une Promesse. Sa sémantique est d'attendre que la promesse soit tenue (fulfilled) et d'en donner le résultat. Si la promesse n'est pas tenue, alors une exception reprenant la raison de l'échec est levée. Par exemple :

```typescript
  const images: ImageData[] = await hallucinateFrom("chats"); 
```

* **`async`** est un mot-clef qui s'utilise devant la définition d'une fonction. Il indique que cette fonction renvoie une Promesse et qu'il est possible d'utiliser dans son corps le mot-clef **`await`**. Si dans le corps de la fonction vous renvoyez un résultat qui n'est pas une promesse, Javascript l'encapsulera tout seul dans une promesse tenue comprenant ce résultat. Le fait que la fonction soit marquée **`async`** implique que tout appel de la fonction sera une instruction asynchrone renvoyant une promesse. Dans les dernières versions de Javascript, il est possible d'utiliser await dans le code racine d'un module (c'est-à-dire un fichier Javascript défini comme étant un module).

En utilisant **`async`** et **`await`**, l'écriture de code asynchrone devient alors très proche de l'écriture de code synchrone impératif. Par exemple, supposons que P soit une promesse renvoyant un nombre et supposons que P puisse être rejetée, un code utilisant P pourrait être :

```typescript
async function h(nb:number): Promise<number> {
    try {
        const v = nb + await P;
        return v;
    } catch(err) {
        console.error("Error getting P:", err);
        return -1;
    }
}
```

Notons encore une fois que `h` renvoie non pas un nombre mais la promesse d'un nombre car elle est déclarée comme `async` !

On retrouve ici une structuration du code très proche d'un code synchrone. La synchronisation peut se faire, si besoin, en utilisant `await`. La fonction est quant à elle simplement préfixée par `async`. Les erreurs peuvent être gérées par l'habituel `try catch`. Sans ces notations, il est aussi possible de gérer les erreurs, mais cela se fait à l'aide des méthodes `then` et `catch` des Promesses. Ainsi, le code précédent s'écrirait :

```typescript
function h(nb: number): Promise<number> {
    return P.then(
      x => x + nb,
      err => {
        console.error("Error getting P:", err);
        return -1;
      }
    )
}
```

ou encore :

```typescript
function h(nb:number): Promise<number> {
    return P.then(
      x => x + nb
    ).catch( err => {
      console.error("Error getting P:", err);
      return -1;
    });
}
```
