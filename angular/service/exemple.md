# Un exemple de service et d'injection

Nous allons discuter d'un StackBlitz ([https://stackblitz.com/edit/ptf-ens-l3m-angular-service-exemple](https://stackblitz.com/edit/ptf-ens-l3m-angular-service-exemple?file=src%2Fapp.component.html,src%2Fapp.component.scss,src%2Fexemple.service.ts,src%2Fmain.ts)) qui met en oeuvre un service simple permettant d'obtenir des informations sur la série ***Game of Thrones***. Ce service nosu sert à encapsuler les appels à la Web API [Game Of Thrones Quotes API](https://gameofthronesquotes.xyz/).

Le service est d'abord déclaré comme injectable au niveau de la racine de l'application :

```typescript
@Injectable({
  providedIn: 'root' // Indique que le service est instanciable par la racine de l'application
})
export class GOTService {
    ...
}
```

Il est injecté dans le composant `AppComponent` (on demande un paramètre de type `GOTService` ) :

```typescript
export class AppComponent {
  constructor( private gotService: GOTService ) {
    ...
  }
}
```

Revenons au service, on défini à la fin du fichier le modèle des données qui seront utiliés :

```typescript
export interface House<T extends Member> {
  readonly name: string;
  readonly slug: string;
  readonly members: readonly T[];
}

export interface Member {
  readonly name: string;
  readonly slug: string;
}

export interface MemberWithQuotes extends Member {
  readonly quotes: readonly string[];
}
```

Dans la classe `GOTService`, on définit d'abord une propriété privée _houses de type WritableSignal. Cette propriété est privée car on ne veut pas que les utilisateurs du services puissent publier eux-mêmes des valeurs dans ce signal. On définit ensuite une propriété publique `houses` de type ReadableSignal qui est dérivée du signal privé. 

```typescript
private readonly _houses = signal<readonly House<Member>[]>([]);
readonly houses = computed<readonly House<Member>[]>( () => this._houses() );
```

Même chose pour `_selectedHouse` et `selectedHouse` qui publient `undefined` si il n'y a pas de maison sélectionnée ou la maison sélectionnée sinon (avec les citations des membres de la maison) :

```typescript
private readonly _selectedHouse = signal<undefined | House<MemberWithQuotes>>( undefined );
readonly selectedHouse = computed<undefined | House<MemberWithQuotes>>( () => this._selectedHouse() );
```

Le constructeur fait appel à des fonctions pour récupérer des données via des requêtes HTTP. Comprendre ce code n'est pas nécessaire pour ce bloc de cours à propos des services. Les plus curieux peuvent consulter le bloc de cours à propos des processus synchrones et asynchrones qui explique ce que sont les promesses et comment les utiliser.

La méthode select permet de sélectionner une maison et de récupérer les citations de ses membres. Elle publie le résultat via le signal `_selectedHouse`.

Passons maintenant au composant `AppComponent`. Nous définissons les attributs `houses` et `selectedHouse` qui sont des alias des attributs du même nom du service `GOTService`. Notez que les types sont définis à partir du type du service (`GOTService`) :

```typescript
readonly houses:        GOTService['houses'];
readonly selectedHouse: GOTService['selectedHouse'];
```

Nous utilisons ces attributs dans le template du composant.
Dans ce même template, nous définissons des boutons pour sélectionner une maiso et en avoir les détails. Cesboutons font appel à la méthode `select` du composant `AppComponent` qui fait un appel à la méthode `select` du service `GOTService` :

```typescript
select(h: House<Member>) {
  this.exs.select(h);
}
```
