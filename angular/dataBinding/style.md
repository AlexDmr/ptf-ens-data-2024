# Data binding sur l'attribut style

L'attribut style des balises HTML est parfois utilisé pour définir le style d'une balise, on préfère en général passer par la feuille de style et des classes CSS mais il arrive qu'on doivent passer par l'attribut style.

Il existe deux façon d'affecter des valeurs de style à une balise HTML en utilisant les data-binding Angular :
1. En utilisant un attribut [style.xxx] où xxx est le nom d'un attribut de style CSS. La valeur associée est alors affecté à cette attribut CSS.
2. En utilisant un attribut [style] dont la valeur est un objet dont les clefs sont les noms des attributs CSS et les valeurs les valeurs à affecter à ces attributs CSS.

Quelques exemples sont donnés ci-dessous, en supposant qu'on dispose des signaux :
* color qui émet des string représentant des couleurs.
* font qui émet des string représentant des descriptions de fontes textes.
* config qui émet des objets dont les clefs sont des noms d'attributs de style CSS et les valeurs des valeurs à affecter à ces attributs CSS (par exemple `{color: 'red', 'font-size': '12px'}`).

```html
<div [style.backgroundColor]="color()">...</div>

<div [style.backgroundColor]="color()" [style.font]="font()">...</div>

<div [style]="{backgroundColor: color(), font: font()}">...</div>

<section [style]="config()">...</section>
```

Notez qu'il vaut mieux ne pas combiner ces deux notations.