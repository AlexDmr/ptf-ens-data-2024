# On continue avec la méthode filter

La [méthode filter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter) permet de produire un sous tableau contenant certains des éléments du tableau original. Cette méthode prend en paramètres une fonction f qui sera appelée pour chaque élément du tableau et renverra un booléen pour chacun d'eux. L'élément est présent dans le tableau résultat, si et seulement si la fonction f a renvoyé true pour cet élément. L'image animée suivante illustre cela pour un tableau de nombres et une fonction f renvoyant vrai si l'élément courant est impair.

<img src="./assets/typescript/tableaux/schema_II.6.gif" style="max-width: 100%;" /> 


