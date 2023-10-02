# Directives structurelles *ngIf, *ngSwitch et *ngFor

Angular offre des directives structurelles qui permettent d'injecter ou de retirer des balises dans le DOM (et pas seulement des fragments de texte comme avec la notation moustache). Ces directives sont des attributs prenant place dans des balises. Nous étudierons, ici, les trois directives structurelles principales que sont **\*ngIf, ngSwitch et \*ngFor**.

## \*ngIf

Cette directive conditionne l'affichage d'une balise à une expression booléenne (calculée dans le contexte de la VueModèle). La balise est insérée dans le DOM si l'expression est évaluée à vrai, elle est retirée sinon.

```html
<div  *ngIf = "EXPRESSION BOOLÉENNE" >
```

La syntaxe du `*ngIf` permet aussi de référencer le résultat de l'expression `E` dans une variable locale `V` avec une syntaxe du type `*ngIf="E as V"`.
Cela est utile si l'expression renvoie autre chose qu'un booléen (par exemple un objet ou un tableau) et que l'on souhaite utiliser ce résultat dans le fragment HTML. Par exemple, en supposant que `sigL` est un signal produisant des `undefined | number[]`, on peut afficher le fragment si et seulement si le signal produit un tableau de nombres :

```html
<div *ngIf = "sigL() as L">
  Voici la liste : {{L | json}}
</div>
```

Enfin, il est possible de mentionner un `else`. Dans ce cas, si l'expression est évaluée à faux, le fragment HTML mentionné après le `else` est injecté dans le DOM. Ce fragment **DOIT** référencer une balise `ng-template`. Notez dans l'exemple ci dessous que la balise `ng-template` contient un attribut `#pasDeListe` qui permet à Angular de l'identifier. Cet attribut est utilisé dans le `else` pour référencer le fragment HTML à injecter dans le DOM si l'expression est évaluable à false (ici si le signal `sigL` produit `undefined`).

```html
<div *ngIf = "sigL() as L; else pasDeListe">
  Voici la liste : {{L | json}}
</div>

<ng-template #pasDeListe>
  <label>Il n'y a pas de liste à afficher...</label>
</ng-template>
```

## \*ngSwitch

Cette directive injecte dans le DOM un élément parmi plusieurs possibles selon la valeur d'une expression. Comme son nom l'indique, son comportement est similaire à celui d'une instruction switch des langages de programmation. Cette directive n'est pas en elle-même une directive structurelle mais elle est accompagnée de deux directives qui le sont : ***\*ngSwitchCase*** et ***\*ngSwitchDefault***. Ces trois directives sont utilisées de concert. Dans l'exemple suivant, on suppose que dataType est un **Signal\<string\>** qui indique un format de données. Selon ce type, une balise est utilisée si le type vaut `'date'` ; une autre l'est, si le type vaut `'json'` ; et enfin si le type est autre, on utilise la troisième balise (***\*ngSwitchDefault***) :

```html
<div [ngSwitch]=" dataType ">
  <div *ngSwitchCase=" 'date' ">{{data | date}}</div>
  <div *ngSwitchCase=" 'json' ">{{data | json}}</div>
  <div *ngSwitchDefault        >{{data}}       </div>
</div>
```

## \*ngFor

Cette directive permet de parcourir des structures de données itérables (comme les tableaux) et injecte des fragments HTML dans le DOM pour chaque élément de la structure itérable en liant ce fragment à la valeur en question. La valeur de la directive représente une boucle de type for...of. Par exemple, en supposant que L soit définit comme un attribut de type tableaux de string dans la VueModèle, on pourrait afficher ses éléments dans une liste :

```html
<ul>
  <li *ngFor = "let str of L">
    <label>{{str}}</label> <em>{{str.length}}</em>
  </li>
</ul>
```

Il est possible d'avoir accès à l'indice courant à l'aide de la variable index, fournie par Angular. Il faut alors référencer cette variable avec un nom (par exemple i) pour pouvoir l'utiliser dans le fragment HTML. Par exemple :

```html
<ul>
  <li *ngFor = "let str of L; index as i">
    <label>{{str}}</label> (position {{i}})
  </li>
</ul>
```
