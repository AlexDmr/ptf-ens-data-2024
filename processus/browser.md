# Dans le navigateur

La mise en oeuvre des flux asynchrones s'appuie sur un mécanisme de file d'attente d'instructions à exécuter (un peu comme la file d'événements). Reprenons l'exemple précédent pour illustrer notre propos.

<div style="text-align: center">
  <!--
  exemple => A; B-; C;
  QuandBtermineAlorsExecuterD => -B; D;
  -->
  <img src="assets/processus/processus.exemple.svg" alt="Représentation de l'exemple" style="width: min(100%, 150px);"/>
</div>

Lorsque le programme est exécuté, il ajoute à la file d'attente d'instructions à exécuter le programme principal.
Il exécute donc ici le le flux **`exemple`**.

ajoute B à la liste des instructions à exécuter

défile B, B s'execute (lance un thread car c'est de la lecture de musique, pourrait ne pas lancer de thread si autre chose). B rend la main, elle préviendra quand il sera terminée.

B termine, tous les blocs d'instructions qui démarre par **`B est terminé`** sont enfilés dans la file d'attente.

On défile (ici le bloc "QuandBtermine") et on exécute ce bloc.

XXX Ajouter une table avec les instruction asynchrone <état; file de callbacks> ???? Oui ça pourrait être pas mal !!!

