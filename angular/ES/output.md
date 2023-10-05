# Définir une sortie pour un composant

Angular permet de définir des **« sorties »**  pour les composants. Il s'agit de pouvoir émettre des données à l'extérieur du composant afin que celui qui l'utilise puisse les exploiter. Une « sortie »  prend la forme d'un attribut de la balise HTML du composant qui va être lié à un attribut de la classe de ce composant. L'établissement de ce lien se fait grâce au décorateur `@Output` qui est fourni par Angular.

Contrairement aux décorateurs `@Input` qui peuvent être de différents types, les décorateurs `@Output` sont tous des instances d'EventEmitter, une classe générique fournie par Angular qui permet d'émettre des événements typés selon le type générique utilisé. Par convention, si l'événement géré par le `@Output` est lié à une donnée `@Input`, on spécifie le nom de l'attribut `@Output` en suffixant celui du `@Input` avec `"Change"` .

Dans la VueModèle du composant CouleurSlide, cela se traduit par l'extrait de code ci-dessous. On déclare un `@Output couleurChange` (du nom de l'`@Input`, suffixé par Change), on spécifie dans son type générique le type des données qui seront émises. Enfin, on fait appel à la méthode emit de l'EventEmitter lorsqu'on veut publier une donnée particulière (voir dans la méthode update).

```typescript
export class CouleurSlideComponent {
  private _couleur = signal<string>('#000000');
  @Input() 
    get couleur(): string { return this._couleur() }
    set couleur(c: string) { this._couleur.set(c) }
  @Output() couleurChange = new EventEmitter<string>();

  ...

  update(u: Partial<ColorRGB>): void {
    ...
    this.couleurChange.emit( nouvelleCouleur ); // On émet l'événement ici
  }
}
```

Dans la vue du composant conteneur, il est possible de s'abonner à l'événement comme ceci. On note que `$event` désigne la valeur émise et peut être utilisée.

```html
<app-couleur-slide (couleurChange)="colorA.set($event)"></app-couleur-slide>
```

Dans un cas comme le nôtre ou l'attribut @Input est accompagné d'un émetteur `@Output` correspondant, il est possible d'exprimer directement un double data-binding (V vers VM et VM vers V) :

```html
<app-couleur-slide [(couleur)]="colorB"></app-couleur-slide>
```

qui n'est qu'une abréviation pour :

```html
<app-couleur-slide [couleur]="colorB" (couleurChange)="colorB = $event"></app-couleur-slide>
```

Les plus attentifs auront déjà compris que `colorB` doit ici être un attribut de type `string` ou un attribut calculé de type `string` s'appuyant sur un `signal<string>`.
