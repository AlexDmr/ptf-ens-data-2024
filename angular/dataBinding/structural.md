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

### \*ngFor : tracking des fragments HTML

À chaque fois que l'itérable géré dans le `*ngFor` produit une nouvelle valeur, Angular va remettre à jour la liste des fragments HTML associés à chaque élément de l'itérable.
Angular essai d'être *"malin"* et regarde, pour chaque élément de la nouvelle liste, si il a déjà étté associé à un fragment dans l'ancienne liste, si c'est le cas il réutilise ce fragent (qui est donc déjà bien configuré).

Par défaut, Angular utilise l'opérateur d'égalité `==` pour comparer les éléments de la nouvelle et de l'ancienne liste. Il arrive parfois que ça ne soit pas la meilleur façon de faire, par exemple si on a une liste d'objets immuables, chacun avec un identifiant. On aimerait alors que si un objet change et qu'une nouvelle version de cet objet est présente dans la liste (une nouvelle référence mais le même identifiant), Angular réutilise le fragment HTML associé à l'ancienne version de l'objet (car il sera partiellement bien configuré, la mise à jour ne concernant que les parties de l'objet qui ont changé). Sans être malin, alors Angular créera un nouveau fragment qu'il faudra entièrement reconfigurer.

Cela peut aussi importer dans le cas où le fragment en question a un état d'interaction (par exemple il contient un champs texte qui a le focus clavier) : Si on ne fait pas attention, Angular va créer un nouveau fragment et le focus clavier sera perdu.

Angular nous propose heureusement de pouvoir configurer la fonction de tracking des objets de la boucle (mot-clef `trackBy`). Cette fonction extrait une valeur (par exemple la valeur de l'atribut id de l'objet) à partir de l'objet et de son indice dans l'itérable. C'est cette valeur qui est ensuite comparée pour savoir si un fragment HTML peut être réutilisé ou non.

Par exemple, si on a une liste d'objets de type `Personne` avec un attribut `id` de type `number`, on peut utiliser la fonction suivante pour comparer les objets :

```typescript
// Dans la vue-modèle, on définit la méthode suivante :
trackByIdx(i: number, p: Personne): number { return p.id }
```

et dans le HTML de la vue on utilisera :

```html
<ul>
  <li *ngFor = "let p of personnes(); trackBy: trackByIdx">
    <label>{{p.nom}}</label> ({{p.age}} ans)
  </li>
</ul>
```
