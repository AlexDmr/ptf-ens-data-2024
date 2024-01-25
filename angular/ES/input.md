# Définir une entrée pour un composant

Angular permet de définir des **« entrées »** pour les composants. Il s'agit de fournir des données à un composant pour le paramétrer. Une « entrée » prend la forme d'un attribut de la balise HTML du composant, qui sera lié à un attribut de la classe de ce composant. Ce lien est établi grâce au décorateur **`@Input`**, fourni par Angular.

Pour comprendre l'intérêt de cela, reprenons l'exemple du composant CouleurSlide. Jusqu'ici, nous l'avons spécifié sans entrée (ni sortie). Il récupère les informations sur la couleur qu'il doit représenter via un observable fourni par un service. Cependant, si l'on instancie plusieurs composants couleurs, ils seront tous liés au même service et représenteront donc tous la même couleur. Bien que cela soit parfois souhaité, dans notre cas, cela limite fortement l'intérêt de ce composant. Il serait plus judicieux de pouvoir spécifier la couleur de chacun afin de les lier facilement (par exemple, un composant couleur pour gérer la couleur du texte, un autre pour gérer la couleur de fond). Dans ce cas, il devient intéressant de permettre la configuration du composant avec une couleur donnée.

Dans l'exemple du composant couleur, cela pourrait donner le code suivant, où l'attribut couleur est déclaré comme une entrée et initialisé à la valeur par défaut `#000000` :

```typescript
export class CouleurSlideComponent implements OnInit {
  @Input() couleur: string = '#000000';
  ...
}
```

La balise du composant `CouleurSlide` peut alors être utilisée dans la Vue d'un composant « conteneur ». Un attribut couleur est ajouté, les crochets indiquent à Angular qu'un binding est à faire, c'est-à-dire que la valeur de l'attribut doit être évaluée dans le contexte de la VueModèle du composant conteneur. Un tel binding n'est autorisé par Angular que si `couleur` est bien un attribut du composant `CouleurSlide`. Dans le cas présent, la valeur de la couleur sera fournie par le signal `colorA` défini dans la vue-modèle du composant conteneur.

```html
<app-couleur-slide [couleur]="colorA()"></app-couleur-slide>
```

## Input de type T ou WritableSingal\<T> ?

Dans l'exemple précédent, l'attribut `couleur` est déclaré comme une entrée de type `string`. C'est effectivement la forme sous laquelle nous souhaitons **passer** au composant `CouleurSlide` la couleur à représenter. Cependant, cela n'est pas forcément la façon dont nous voulons **stocker** cette couleur.

En effet, nous nous retrouvons avec une variable qui n'est pas réactive, alors que jusqu'ici nous avons manipulé des signaux. Dans ce cours, nous imposons comme bonne pratique d'utiliser des signaux (ou des observables RxJS que nous verrons plus tard) afin de toujours disposer de toute la puissance de la programmation réactive.

Pour concilier les deux objectifs :

1. pouvoir passer une valeur à un composant sous sa forme la plus naturelle (ici, une couleur est une chaîne de caractères),
2. pouvoir stocker cette valeur sous la forme d'un signal afin de disposer en interne de la puissance de la programmation réactive.

Nous promouvons l'usage d'attributs calculés pour les entrées. Dans le cas présent, cela donne :

```typescript
export class CouleurSlideComponent implements OnInit {
  // on définit un signal privé qui stocke la couleur avec une valeur par défaut
  private _couleur = signal<string>('#000000');

  // On définit un attribut calculé qui permet de voir la couleur comme une string à l'exérieur du composant tout en en disposant comme un signal à l'intérieur
  @Input() 
    get couleur(): string { return this._couleur() }
    set couleur(c: string) { this._couleur.set(c) }

}
```
