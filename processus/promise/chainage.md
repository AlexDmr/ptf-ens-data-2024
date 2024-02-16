# Synchronisation des promesses pour gérer le flux d'exécution asynchrone

Pour exécuter du code après qu'une promesse est **résolue** (qu'elle soit dans l'état **fulfilled** ou **rejected**), les promesses offrent les méthodes **then**, **catch** et **finally** :

* [**then**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) : Prend en paramètres optionnels deux callbacks. Le premier est appelé si la promesse termine dans l'état **fulfilled**, et le second est appelé si la promesse termine dans l'état **rejected**. La méthode **then** renvoie une promesse dont le type de valeur sera déterminé par la callback appelée.

    ```typescript
    // Exemple : Halluciner une image de chats et la faire repeindre par Picasso
    const chatsDePicasso: Promise<ImageData> = hallucinateFrom("chats").then(image => repaint(image, "Picasso"));
    ```

    On peut également fournir une callback pour gérer les erreurs. Dans l'exemple ci-dessous, si **hallucinateFrom** est rejetée, on renvoie une image de chats quelconque. Si c'est **repaint** qui est rejetée, on renvoie l'image du tableau de Picasso : [Chat saisissant un oiseau](https://www.museepicassoparis.fr/fr/chat-saisissant-un-oiseau).

    ```typescript
    const chatsDePicasso: Promise<ImageData> = 
    hallucinateFrom("chats").then( 
        image => image,
        _err  => chatSaississantUnOiseau
    ).then( 
        image => repaint(image, "Picasso"),
        _err  => chatSaississantUnOiseau
    );
    ```

* [**catch**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) : Raccourci pour écrire **then(undefined, cbOnReject)**. Prend en paramètre un callback qui sera appelé si la promesse termine dans l'état **rejected**. La méthode **catch** renvoie une promesse dont le type de valeur sera déterminé par la callback appelée.

    ```typescript
    const chatsDePicasso: Promise<ImageData> = 
    hallucinateFrom("chats").then( 
        image => repaint(image, "Picasso")
     ).catch( 
        _err  => chatSaississantUnOiseau
     );
    ```

* [**finally**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) : Permet d'exécuter une fonction sans arguments après que la promesse soit **résolue** (tenue ou rejetée). La méthode **finally** renvoie une promesse dont le type de valeur sera déterminé par la callback appelée. En conséquence, on utilise pas finally pour gérer les erreurs mais plutôt pour exécuter du code *de nettoyage* qu'il faut appliquer dans tous les cas.

    ```typescript
    const chatsDePicasso: Promise<ImageData> = 
    hallucinateFrom("chats").then( 
        image => repaint(image, "Picasso")
     ).catch( 
        err  => chatSaississantUnOiseau
     ).finally( 
        () => console.log("On est sûr d'avoir une image de chats...")
     );
    ```
