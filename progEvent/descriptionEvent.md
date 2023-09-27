# Comment est décrit un événement ?
Dans un navigateur web et selon la spécification DOM, un événement est décrit par un objet conforme à l'interface Event. Cette interface définit plusieurs propriétés, nous ne présentons que celles utiles pour ce cours (voir [MDN](https://developer.mozilla.org/fr/docs/Web/API/Event) pour le détail) :

* **bubbles** : booléen en lecture seule indiquant si l'événement se propage dans l'arbre du DOM ;
* **cancelable** : un booléen en lecture seule indiquant si l'événement est annulable ;
* **currentTarget** : un élément en lecture seule indiquant à quel nœud est associé l'événement lors de la propagation ;
* **target** : un élément en lecture seule indiquant quel nœud est à l'origine de la propagation de l'événement ;
* **eventPhase** : un booléen en lecture seule indiquant dans quelle phase de propagation se trouve l'événement ;
* **timeStamp** : un nombre en millisecondes indiquant à quel moment l'événement a été produit ;
* **type** : une chaîne de caractère en lecture seule indiquant le type de l'événement (par exemple, « mousedown ») ;
* **isTrusted** : un booléen en lecture seule indiquant si l'événement a été  levé par le navigateur lui-même. Il est en effet possible de créer ses propres événements et, dans ce cas, l'attribut isTrusted est affecté à la valeur fausse.


Plusieurs méthodes peuvent être utilisées sur les objets événements :

* **preventDefault()** : Empêche le navigateur de déclencher le comportement par défaut associé à cet événement. Cela permet par exemple d'empêcher une page de défiler lorsqu'on fait tourner la molette de la souris (et à la place on peut zoomer sur une carte, par exemple) ;
* **stopPropagation()** : Arrête la propagation de l'événement dans le DOM.
Ces attributs et méthodes sont ceux partagés par tous les événements du DOM. Cependant, chaque type d'événement peut avoir d'autres attributs. C'est le cas, par exemple, [des événements générés par le pointeur souris](https://developer.mozilla.org/fr/docs/Web/API/MouseEvent) qui ajoutent entre autres des attributs décrivant les coordonnées du pointeur souris.
