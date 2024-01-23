# Data binding sur l'attribut class

L'attribut class des balises HTML est souvent utilisé pour définir le style d'une balise. Angular permet de lier la valeur de cet attribut à une expression calculée par rapport aux données de la ***vue-modèle*** (voir [la documentation](https://angular.io/guide/attribute-binding)).

Il existe plusieurs façon de lier tout ou partie des classes CSS d'une balise HTML à une expression calculée par rapport à la ***vue-modèle***. Nous présentons les principales ci-dessous.

## Liaison d'une classe CSS xxx particulière avec [class.xxx]
Il peut être souvent pratique d'ajouter ou de retirer une classe CSS à une balise en fonction d'une condition.
Angular offre une notation dédiée à cela (voir [la documentation](https://angular.io/guide/class-binding#binding-to-a-single-css-class)). Supposons que nous voulions ajouter la classe CSS `formidable` à une balise `div` si et seulement si le signal isFormidable émet la valeur vrai. Nous pouvons utiliser la syntaxe suivante :

```html	
<div [class.formidable]="isFormidable()">...</div>
```

Il est possible de déclarer plusieurs attributs de ce type si on veut gérer ainsi plusieurs classes CSS.
Dans l'exemple ci-dessous, la classe CSS `formidable` est ajoutée si et seulement si le signal isFormidable émet la valeur vrai et la classe CSS `chaud` est ajoutée si et seulement si le signal temp émet une valeur supérieure à 20.

```html
<div [class.formidable]="isFormidable()" [class.chaud]="temp() > 20">...</div>
```

## Liaison d'un ensemble de classes CSS avec [class]
Angular permet d'affecter plusieurs classes CSS à une balise en utilisant l'attribut [class].
L'expression associée à cet attribut peut alors être :

* une chaîne de caractères contenant les noms des classes CSS séparés par des espaces
* un tableau de string contenant les noms des classes CSS
* un objet dont les clefs sont les classes et les valeurs des booléens, la classe CSS étant ajoutée ou retirée en fonction de la valeur booléenne qui lui est associée.

Dans l'exemple ci-dessous, la classe CSS `formidable` est ajoutée si et seulement si le signal isFormidable émet la valeur vrai et la classe CSS `chaud` est ajoutée si et seulement si le signal temp émet une valeur supérieure à 20.

```html
<div [class]="{formidable: isFormidable(), chaud: temp() > 20}">...</div>
```

Dans l'exemple ci-dessous, on suppose qu'on a un signal L qui emet des tableaux de string, chacun de ces tableaux contenant les noms des classes CSS à ajouter à la balise. On peut alors utiliser la syntaxe suivante :

```html
<div [class]="L">...</div>
```
