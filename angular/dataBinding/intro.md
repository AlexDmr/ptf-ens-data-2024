# Introduction au data-binding en Angular

Le mécanisme de data-binding permet de lier des données entre elles. Il permet de mettre à jour automatiquement les données de l'interface utilisateur (qui sont rendues dans la ***vue***) en fonction des données de la ***vue-modèle*** et vice-versa.


## Mise à jour de la Vue en fonction de la Vue-modèle

Nous nous intéressons ici à la mise à jour de la ***vue*** en fonction de données présentes dans la ***vue-modèle***.
Nous considérons dans ce cours que les données produites par la ***vue-modèle*** sont exposées par des ***signaux***, c'est la direction récemment adoptée par Angular (depuis la version 16 en 2023) et qui peut être considérée comme un excellent choix.
Angular nous offre deux grands moyen de réaliser cela :

1. **L'injection de texte avec la notation moustache.** <br/>
    Oui c'est bien son véritable nom (inclinez votre tête et vous verrez les moustaches). <br/>
    C'est ce que nous avons vu dans l'exemple précédent de la température où la valeur de la température était injectée dans la vue avec la notation `{{temp()}}`. Angular va évaluer les expressions entre double accolades (les fameuses moustaches), sérialiser le résultat sous forme de texte et injecter ce texte à la place des moustaches.<br/>
    Il est aussi possible de changer le formatage par défaut des expressions ; il existe pour cela un système de pipe (voir [la documentation](https://angular.io/guide/pipes)). Il est, par exemple, possible de formater le texte en majuscules (ex: `{{name() | uppercase }}`. Il est aussi possible de formatter le texte au format date (ex: `{{birthday() | date:"dd/MM/yy"}}` ) ou encore un objet Typescript au format JSON (ex: `{{dataObj() | json}}` ).

2. **La liaison de propriété de balises HTML avec la notation entre crochets.**
    Angular permet de lier la valeur des attributs d'une balise HTML à une expression calculée par rapport aux données de la ***vue-modèle*** (voir [la documentation](https://angular.io/guide/property-binding)). 
    Pour une balise et une propriété liable, il est possible de définir des liens de type (VM → V) de la sorte :

    ```html
    <BALISE  [PROPRIETE] = "EXPRESSION" >
    
    <!-- Exemples -->
    <div [style.color]="color()">
    <div [class]="cssClass()">
    ```

    Le ou les attributs `[PROPRIETE]` dépendent de la balise. L’expression est calculée par rapport à la VueModèle (tout comme pour la notation moustache). Par exemple, les balises *img* permettent de lier la propriété *src*. Dans l'exemple ci-dessous, à chaque fois que le signal `EXPRESSION_ADRESSE_IMAGE` changera de valeur, l'image sera mise à jour.

    ```html
    <img  [src] = "EXPRESSION_ADRESSE_IMAGE()" />
    ```


## Mise à jour de la Vue-modèle en fonction de la Vue

Comme vous devez le savoir, il est possible d'observer des événements d'une page HTML (par exemple que l'utilisateur à cliqué sur la représentation d'une balise comme pour l'exemple précédent de la température). Angular permet de s'abonner à des événements dans le HTML et à exécuter une instruction dans le contexte de la ***vue-modèle*** (voir [la documentation](https://angular.io/guide/event-binding)).

La notation retenue par Angular est la suivante, dans la balise pour laquelle on cherche à s'abonner, on ajoute en attribut le nom de l'événement entouré de parenthèses. La valeur de cet attribut représente l'instruction à exécuter lorsque l'événement est capturé par la balise.
Par exemple, pour s'abonner au ***clic*** sur un paragraphe et appeler la méthode ***banco*** de la ***vue-modèle***, on pourrait avoir le code HTML suivant dans la ***vue*** :

```html
<p (click) = "banco()" >
  blabla
</p>
```

Les événements auxquels il est possible de s'abonner sont ceux de HTML5 (click, dblclick, focus, blur, etc.), il est possible de récupérer la valeur de l'événement dans l'instruction grâce à la variable **$event**. Cette variable est spécifiée par Angular à chaque fois qu'un abonnement est déclenché. Par exemple :

```html
<p (dblclick) = "setCoordinate($event.pageX, $event.pageY)" >
  blabla
</p>
```

Autre exemple, on s'abonne au chargement d'une image :

```html
<img  [src] = "EXPRESSION_ADRESSE_IMAGE()" (load)="imageLoaded()" />
```
