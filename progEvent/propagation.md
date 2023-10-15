# Que signifie qu'un événement se propage ?

Certains événements, mais pas tous, se propagent dans le DOM. Pour bien comprendre ce que cela signifie, il faut d'abord se rappeler qu'une page web peut être vue comme un arbre (au sens « structure de données »). La propagation d'un événement dans le DOM se fait en descendant et en remontant la hiérarchie des noeuds.

La figure ci dessous, tiré de la [spécification officielle du W3C](https://www.w3.org/TR/DOM-Level-3-Events), illustre un arbre simple. On suppose que l'utilisateur a cliqué sur la balise td qui contient le texte "Over the River, Charlie". L'événement commence (phase 1 dîte de **capture**) par descendre de la racine au nœud cliqué, on arrive alors sur le noeud (phase 2 dîte **target**) et on remonte ensuite vers la racine (phase 3 dîte de **bubbling**).

<div style = "text-align: center; margin: auto;">
    <img src   = "local://assets/progEvent/eventflow.svg" style="max-width: 400px;"/>
</div>

D'une manière générale, il y a temporellement trois phases de propagation d'un événement (voir illustration ci-dessous, tirée de la spécification du W3C) :
1. La phase **capture** : l'événement « descend » de la racine vers le nœud cible. Lors de cette phase, tous les ancêtres du nœud cible seront prévenus de l'événement.
2. La phase **target** : le nœud cible est prévenu de l'événement.
3. La phase **bubbling** : l'événement « remonte » du nœud cible vers la racine. Lors de cette phase, tous les ancêtres du nœud cible seront prévenus de l'événement.

Il faut bien noter que **SEULES** les phases capture et target concernent tous les types événements. La phase de bubbling n'en concerne que certains, les événements relatifs aux pointeurs notamment.