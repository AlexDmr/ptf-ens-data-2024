# Bien définir un composant

Nous discutons ici de bonnes pratiques à adopter dans ce cours lorsque vous définissez des composants.

## Rendre la présence d'un attribut représentant une entrée obligatoire ?

Lorsque vous spécifiez une entrée pour un composant, celui qui instancie votre composant n'est pas obligé de spécifier une valeur pour cette entrée. Cela n'est pas un problème si votre entrée a une valeur par défaut, mais cela devient problématique si votre composant n'a de sens que si cette entrée est spécifiée et qu'il n'est pas possible de fournir une valeur par défaut.

Dans ce cas, Angular 16 introduit la possibilité de rendre obligatoire la présence d'une entrée. Pour cela, il faut passer en paramètre du décorateur `@Input` un objet de configuration contenant l'attribut `required` à `true`. Par exemple, pour rendre obligatoire la présence de l'entrée `couleur` dans le composant `CouleurSlide`, on écrira :

```typescript
export class CouleurSlideComponent implements OnInit {
  @Input({ required: true }) couleur: string; // Plus besoin de valeur par défaut
  ...
}
```

Cela peut bien entendu se combiner avec un attribut calculé. Dans ce cas, il est nécessaire de donner une valeur par défaut pour initialiser le signal. L'intérêt existe cependant bel et bien, car cela permet d'obliger l'utilisateur du composant à fournir une valeur pour l'entrée (si cela n'est pas le cas, une erreur est levée à la compilation).

```typescript
export class CouleurSlideComponent implements OnInit {
  private _couleur = signal<string>('#000000');
  @Input({ required: true }) 
    get couleur(): string { return this._couleur() }
    set couleur(c: string) { this._couleur.set(c) }
  ...
}
```

## Définir une interface STATE modélisant l'état du composant

Lorsque votre composant dispose de nombreuses sources de données (entrées, services que nous verrons plus tard, observation des interactions provenant de la vue, etc.), il peut rapidement devenir compliqué et fouilli de synchroniser la vue avec ces différentes sources. En pratique, cela peut introduire des bugs difficiles à régler. Bien que cela ne soit pas évident à démontrer dans un cours pour débutants, nous vous donnons toutefois une bonne pratique pour éviter ce problème.

L'idée est de définir une interface `STATE` modélisant l'état du composant que l'on souhaite passer à la vue :

- La vue va se baser exclusivement sur l'instance de `STATE` qui lui est transmise pour afficher les données.
- La vue-modèle va s'appuyer sur les différentes sources de données pour produire un signal de `STATE` à jour. L'idée est qu'à chaque fois qu'une des sources de données est mise à jour, le signal de `STATE` est mis à jour en conséquence. Nous verrons plus tard dans le cours qu'on pourra parfois préférer des observables RxJS aux signaux.
