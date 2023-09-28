La méthode map
Commençons avec la méthode map. Celle-ci permet de générer un nouveau tableau tab2 de même dimension à partir d'un tableau tab1. Les valeurs du nouveau tableau sont calculées en fonction des valeurs du premier à l'aide d'une fonction passé en paramètres. Supposons l'exemple suivant, tab1 est un tableau de nombre et tab2 le résultat de tab1 par une fonction qui va multiplier par 2 la valeur de chaque case.

```typescript
const tab1: number[] = [3, 7, 2, 1];
const tab2: number[] = tab1.map( x => 2*x );
```

<img src="assets/typescript/tableaux/Animation_methode_map_II.6.gif" style="max-width: 100%;" /> 

Intéressons-nous, maintenant, aux types des méthodes et fonctions mises en jeu dans cet exemple. La méthode **map** prend ici en paramètres une fonction f et renvoie un tableau de nombres. La fonction f prend en paramètres un nombre et renvoie un nombre. Le fait que map prenne en paramètres une fonction, fait de **map** une **fonction d'ordre supérieur**.

Prenons un autre exemple avec **map**, dans lequel on produit un tableau de string à partir d'un tableau de nombres. Dans ce cas, **map** prend en paramètres une fonction f et renvoie un tableau de string.  La fonction f prend en paramètres la valeur et l'indice de la case courante du tableau et renvoie une string. Comme on le voit, le type de la méthode **map** n'est pas toujours le même ; tout comme le type de la fonction qu'elle peut prendre en paramètres. 

```typescript
const tab1: number[] = [3, 7];
const tab2: string[] = tab1.map( (x, i) => `tab[${i}] contient ${x}` );
// tab2 = ["tab[0] contient 3", "tab[1] contient 7"]
```

Pour décrire ce genre de fonctions (ou ce genre de méthodes), Typescript offre l'usage des types génériques. Pour les connaisseurs, c'est très similaire aux types génériques utilisés en Java et un peu différents des templates en C++. Supposons qu'on veuille décrire le type **FCT** des fonctions qui prennent un paramètre de type U et renvoie une valeur de type T ; U et T sont ici des types génériques, c'est-à-dire qu'ils ne correspondent pas à un type existant, ils ne servent qu'à désigner deux types dont on pourra se servir. En Typescript, cela s'écrit :

```typescript
type FCT<U, T> = (param: U) => T;
```

On peut alors définir une variable f1 de type fonction prenant en paramètres un nombre et renvoyant un nombre, et une variable f2 de type fonction prenant un nombre et renvoyant une string. Le typage aidera à détecter les tentatives d'assignation incorrectes.

```typescript
type FCT<U, T> = (param: U) => T;
let f1: FCT<number, number>; f1 = x=>2*x; f1 = x=> ""; // Erreur, string is not assignable to type number let f2: FCT<number, string>; f2 = x=>2*x; // Erreur, type number is not assignable to type string f2 = x=> "";
```

Pour revenir à l'exemple de **map**, qui est une méthode des tableaux, son type peut être défini par le code suivant :

```typescript
interface Array<T> {
  map<U>( f: (e?: T, i?: number) => U ): U[];
}
```

Explications :
* L'interface définit le type des objets tableau (Array), qui est lui-même défini comme un type générique (un tableau contenant des éléments de type T, T pouvant être number, string, etc.).
* La méthode map est définie pour les tableaux, elle nécessite l'utilisation d'un second type générique U puisqu'elle va produire un tableau de U à partir du tableau de T.
* La méthode map prend en paramètres une fonction f. Cette fonction f prend en paramètres un élément de type T (les éléments dans les cases du tableau) et l'index de cet élément. Elle renvoie comme valeur de retour un U.