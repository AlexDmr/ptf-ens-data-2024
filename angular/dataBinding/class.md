# Data binding sur l'attribut class

L'attribut class des balises HTML est souvent utilisé pour définir le style d'une balise. Angular permet de lier la valeur de cet attribut à une expression calculée par rapport aux données de la ***vue-modèle*** (voir [la documentation](https://angular.io/guide/attribute-binding)).

Il existe plusierus façon de lier tout ou partie des classes CSS d'une balise HTML à une expression calculée par rapport à la ***vue-modèle***. Nous présentons les principales ci-dessous.

## Liaison d'une classe CSS particulière avec [class.xxx]
[la documentation](https://angular.io/guide/class-binding#binding-to-a-single-css-class)

## Liaison d'un ensemble de classes CSS avec [class]
* en passant un tableau en paramètre
* en passant un objet dont les clefs sont les classes et les valeurs des booléens, la classe CSS étant ajoutée ou retirée en fonction de la valeur booléenne qui lui est associée.