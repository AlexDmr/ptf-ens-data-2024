# Objets, Interfaces et classes

En `Typescript`, les interfaces permettent de définir le type d'un objet. Un objet est composé d'attributs et de méthodes ; l'interface va décrire le type de ces attributs et de ces méthodes. Prenons l'exemple simple d'une interface décrivant un point dans un espace 2D. Ce point est composé de deux attributs x et y de type nombre.

```typescript
interface Point {
  x: number;
  y: number;
}
```

Cette interface nous permet de définir des objets directement, sans passer par une classe ou un constructeur. En `Typescript`, la compatibilité des types ne se fonde pas sur la hiérarchie de classes et d'interfaces ; la compatibilité entre deux types est établie sur la base de leur structure. Si les structures sont compatibles, alors les types sont déclarées compatibles - c'est une différence majeure avec Java ou C++. Dans l'exemple ci-dessous, on peut ainsi définir un objet avec la notation **JSON** (Javascript Object Notation) suivante :

```json
 {x: 1, y: 2}
 ```

 Nous pouvons alors affecter le résultat de cette expression à une constante (ou variable) de type POINT. `Typescript` vérifiera que l'objet est bien compatible avec le type Point et lèvera une erreur si ce n'est pas le cas. Javascript utilise un mécanisme de [Duck Typing](https://fr.wikipedia.org/wiki/Duck_typing) que `Typescript` traduit donc en mécanisme de [typage structurel](https://fr.wikipedia.org/wiki/Syst%C3%A8me_structurel_de_types), c'est à dire que des objets sont considérés comme similaire si ils ont des structures compatible, indépendamment des instances ou classes qu'ils représentent (contrairement à des langage comme Java qui ont un mécanisme de [typage nominatif](https://fr.wikipedia.org/wiki/Syst%C3%A8me_nominatif_de_types) ).

```typescript
const pt: Point = {x: 1, y: 2};
```

Supposons maintenant qu'on veille protéger x et y en écriture, `Typescript` offre pour cela le mot-clé `readonly` qui peut s'appliquer aux attributs d'une interface (ou d'une classe). La définition devient alors :

```typescript
 interface Point {
  readonly x: number;
  readonly y: number;
}
```

Ajoutons, maintenant, la possibilité de translater le point via une méthode qui renvoie un nouveau Point (Question pourquoi renvoie-t-on un nouveau point et ne modifie-ton pas les données de l'objet ?) :

```typescript
 interface Point {
  readonly x: number;
  readonly y: number;
  translate(dx: number, du: number): Point;
}
```

## Les classes

En ajoutant des méthodes à l'interface, il devient difficile et déconseillé (mais possible) de définir des Points à l'aide de la notation JSON.

```typescript
const pt: POINT = {
    x: 2,
    y: 4,
    translate(dx: number, dy: number): Point {
        return {x: this.x + dx, y: this.y + dy};
    }
}
```

On préfère cependant passer par une structure de classe, plus proche de ce qui se pratique dans les langages à objets. On définit donc ici la classe `PointC` qui implémente l'interface `Point` :

```typescript
class PointC implements Point {
  constructor(readonly x: number, readonly y: number) {}
  translate(dx: number, dy: number): Point {
    return new PointC(this.x + dx, this.y + dy);
  }
}
```

Notez que les paramètres du constructeur sont préfixés par le mot-clé `readonly`. Il s'agit d'un sucre syntaxique dont l'effet est de déclarer x et y à la fois comme paramètre du constructeur et comme attribut `readonly` de la classe. Ce code est équivalent au code suivant :

```typescript
class PointC implements Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
 }

  translate(dx: number, dy: number): Point {
    return new PointC(this.x + dx, this.y + dy);
  }
}
```

L'instanciation des points se fait alors avec le mot-clé **new** :

```typescript
const pt1: Point = new PointC(0, 0);
const pt2 = pt1.translate(1, 2);
```

## Attributs calculés

Il est possible de définir des attributs calculés dans une classe. Un attribut est dit calculé lorsqu'on fait appel à des fonctions pour obtenir sa valeur mais qu'on l'utilise comme un attribut classique. Par exemple, on peut définir un attribut `norme` qui renvoie la norme du vecteur représenté par le point :

```typescript
class PointC implements Point {
  constructor(readonly x: number, readonly y: number) {}
  translate(dx: number, dy: number): Point {
    return new PointC(this.x + dx, this.y + dy);
  }
  get norme(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
```

On note que l'attribut `norme` est défini par une méthode `get` qui ne prend pas de paramètre. On peut alors accéder à cet attribut comme à un attribut classique :

```typescript
const pt1: Point = new PointC(3, 4);
console.log(pt1.norme); // Affiche 5
```

Vous avez sans doute noté que l'attribut `norme` est en lecture seule. Il est possible de définir des attributs en lecture ET en écriture en utilisant en plus du mot-clef `get` le mot-clef `set`. Par exemple, on peut définir un attribut `couleur` qui permet de changer la couleur du point. Le setter vérifiera par exemple que la couleur est une chaine de caractères au bon format en utilisant par une expression régulière :

```typescript
class PointC implements Point {
  private _couleur = '#000000';
  constructor(readonly x: number, readonly y: number) {}
  translate(dx: number, dy: number): Point {
    return new PointC(this.x + dx, this.y + dy);
  }
  get couleur(): string {
    return this._couleur;
  }
  set couleur(c: string) {
    if (/^#[0-9A-F]{6}$/i.test(c)) {
      this._couleur = c;
    } else {
      throw new Error('Couleur invalide');
    }
  }
}
```

On peut alors changer la couleur du point en utilisant l'attribut `couleur` :

```typescript
const pt1: Point = new PointC(3, 4);
pt1.couleur = '#FF0000'; // Rouge
pt1.couleur = 'coucou'; // Lève une exception
```

## Déstructuration d'objets

Quelques mots à propos de la déstructuration des objets
`Typescript`, comme Javascript, propose la déstructuration d'objets (voir documentation). La déstructuration permet de facilement déclarer des variables à partir des attributs des objets, ainsi que de recopier des objets dans d'autres objets. On retrouvera cette notation dans le cours.

```typescript
const {x: monX, y} = pt; // Assignation par destructuration
// Equivaut à 
// const monX = pt.x;
// const y = pt.y; 

const pt3D = {...pt, z: 0}; // Copie par destructuration 
// Equivaut à 
// const pt3D = {x: pt.x, y: pt.y, z: 0};
```
