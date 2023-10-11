# Synchroniser les promesses pour gérer le flux d'exécution asynchrone

Pour exécuter du code après qu'une promesse est **`résolue`** (qu'elle soit dans l'état **`fullfilled`** ou **`rejected`**), les promesses offrent les méthodes **`then`**, **`catch`** et **`finally`** :

* [**`then`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) prend en paramètres optionnels deux callbacks. Le premier est appelé si la promesse termine dans l'état **`fullfilled`**. Le second est appelé si la promesse termine dans l'état **`rejected`**. La méthode **`then`** renvoie une promesse dont le type de valeur sera déterminé par la callback appelée.

    ```typescript
    // Supposons qu'en plus de la fonction hallucinateFrom on dispose de la fonction repaint qui prend en paramètre une image et un artiste et qui renvoie une promesse de l'image modifiée par l'artiste
    function repaint(image: ImageData, artist: string): Promise<ImageData>;

    // Si on veut halluciner une image de chats et la faire repeindre par Picasso, on peut écrire :
    const chatsDePicasso: Promise<ImageData> = hallucinateFrom("chats").then(image => repaint(image, "Picasso"));

    // chatsDePicasso est une promesse de type Promise<ImageData> qui sera tenue si la promesse retournée par hallucinateFrom est tenue puis si la promesse retournée par repaint est tenue. Si l'une des deux promesses est rejetée, alors chatsDePicasso sera rejetée pour la même raison.
    ```

    On peut aussi fournir une callback pour gérer les erreurs. Ici on décide que si **`hallucinateFrom`** est rejetée, alors on renvoie une image de chats quelconque. Si c'est **`repaint`** qui est rejetée, alors on renvoie l'image du tableau de Picasso: [**Chat saisissant un oiseau**](https://www.museepicassoparis.fr/fr/chat-saisissant-un-oiseau).

    Notez comment on enchaine les appels à **`then`** :

    ```typescript
    // On suppose que chatQuelconque et chatSaississantUnOiseau sont des variables les images de chats citées ci-dessus
    const chatsDePicasso: Promise<ImageData> = 
    hallucinateFrom("chats").then( 
        // On s'assure d'avoir une image, même en cas d'erreur
        image => image,
        _err  => chatSaississantUnOiseau
    ).then( 
        // On s'assure d'avoir une image repeinte, même en cas d'erreur
        image => repaint(image, "Picasso"),
        _err  => chatSaississantUnOiseau
    );
    ```

* [**`catch`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) est un raccourci pour écrire **`then(undefined, cbOnReject)`**. C'est-à-dire que **`catch`** prend en paramètre un callback qui sera appelé si la promesse termine dans l'état **`rejected`**. La méthode **`catch`** renvoie une promesse dont le type de valeur sera déterminé par la callback appelée.

    ```typescript
    // Supposons qu'on renvoi chatSaississantUnOiseau en cas d'erreur :
    const chatsDePicasso: Promise<ImageData> = 
    hallucinateFrom("chats").then( 
        image => repaint(image, "Picasso")
     ).catch( 
        _err  => chatSaississantUnOiseau
     );
    ```

* [**`finally`**](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) permet d'exécuter une fonction sans arguments après que la promesse soit **`résolue`** (tenue ou rejeté). La méthode **`finally`** renvoie une promesse dont le type de valeur sera déterminé par la callback appelée (finally ne change pas de type de la promesse sur laquelle elle est appelée). En conséquence, on utilisera pas finally pour gérer les erreurs mais plutôt pour exécuter du code *de nettoyage* qu'il faut appliquer dans tous les cas.

    ```typescript
    // Supposons qu'on veuille afficher un message d'erreur en cas d'erreur et un message de succès en cas de succès :
    const chatsDePicasso: Promise<ImageData> = 
    hallucinateFrom("chats").then( 
        image => repaint(image, "Picasso")
     ).catch( 
        err  => chatSaississantUnOiseau
     ).finally( 
        () => console.log("On est sur d'avoir une image de chats...")
     );
    ```
