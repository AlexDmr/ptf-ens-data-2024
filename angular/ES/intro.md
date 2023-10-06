# Arbre des composants : Entrées et sorties

Jusqu'ici nous avons travaillé avec un seul somposant, mais dans une application réelle, il y a souvent plusieurs composants imbriqués les uns dans les autres et qui forment une arborescence. Ces composants peuvent communiquer entre eux via des entrées et sorties ou via des services.
Dans cette partie, nous allons voir comment les utiliser et comment définir des entrées et des sorties.

La figure ci-dessous rappelle et illustre comment les composants peuvent communiquer entre eux.
Le composant A instancie dans sa vue une balise `app-b` qu'Angular va lier à une instance B de composant `app-b`.
Le composant B va donc être créé, sa vue va être injectée dans la balise `app-b` et le composant B va être instancié.
Le composant B dispose d'une entrée `data` et d'une sortie `update`, le programmeur a spécifié dans la vue du composant A des bindings sur ces entrées et sorties :

* **`data`** est lié au signal sig qui est définie dans la vue-modèle du composant A. On suppose ici que l'entrée `data` du composant B est de type DATA.
* **`update`** est lié à la méthode `changeWith` du composant A. On suppose que la sortie `update` du composant B est de type `Partial<DATA>`.

Notez comment fonctionne la communication entre A et B :

* A chaque fois que sig() produit une nouvelle valeur, celle-ci est transmise à B. Angular déclanche alors un cycle de mise à jour du composant B (il évalue les data-binding internes au composant pour mettre à jour la vue de B).
* A chaque fois que B émet un événement update, l'instruction `changeWith($event)` est évaluée dans le contexte du composant A (`$event` référence la valeur qui a été émise par la l'événement `update`). Angular déclanche alors un cycle de mise à jour du composant A (il évalue les data-binding internes au composant pour mettre à jour la vue de A).

<div style="text-align: center">
  <img src="assets/angular/ES/ES_entre_composants.png" alt="Arbre des composants" style="max-width: min(100%, 800px);"/>
</div>
