# Dans le navigateur

La mise en oeuvre des flux asynchrones s'appuie sur un mécanisme de file d'attente d'instructions à exécuter (un peu comme la file d'événements). Reprenons l'exemple précédent pour illustrer notre propos.

On va représenter la machine sous la forme d'un schéma avec :

* Une file d'exécution des blocs instructions.
* Un tableau listant les instructions asynchrone et leurs états . Une instruction asynchrone peut être dans un des états suivant :
  * "En cours d'exécution" : l'instruction est en cours d'exécution.
  * "Terminée" : L'exécution de l'instruction est maintenant terminée.
* Une console qui affiche les messages.
* Un haut parleur : si le symbole du haut parleur est affiché, cela signifie que la musique est en train d'être jouée, sinon cela signifie qu'on ne joue aucune musique.
* Un diagramme de flux asynchrone tel que vu précédemment.

<iframe src="https://univgrenoble-my.sharepoint.com/personal/demeurea_azure_univ-grenoble-alpes_fr/_layouts/15/embed.aspx?UniqueId=c201c8b3-06fc-4f5e-bdf1-bffb575dca08" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="ArchiProcessis.pptx"></iframe>

## Commentaire du déroulé étape par étape

1. La première diapositive montre simplement les différents éléments de la machine. On suppose que le bloc principal est **`exemple`**.
2. Le bloc exemple est inséré dans la file.
3. On défile un bloc, ici **`exemple`**. On démarre l'exécution de ce bloc.
4. On exécute l'instruction **`A`**. Le message "début" s'affiche dans la console.
5. On exécute l'instruction **`B`**. Comme B est asynchrone, cela revient à enfiler B dans la file.
6. On exécute l'instruction **`C`**. Le message "fin" s'affiche dans la console.
7. On a terminé l'exécution du bloc **`exemple`**, la machine va pouvoir défiler un nouveau bloc si il y en a un.
8. On défile le bloc **`B`**, comme c'est un bloc asynchrone, on enregistre **`B`** dans le tableau des instructions asynchrones. Son état est "en cours d'exécution". (Notez qu'on pourrait tout aussi bien avoir enregistré **`B`** dans ce tableau au moment où on l'a enfilé). La musique commence à être jouée.
9. **`B`** est toujours en cours d'exécution (pendant 2 mns). La machine n'est pas bloquée, elle peut défiler un nouveau bloc si il y en a un ou traiter des événements. L'instruction asynchrone **`B`** exécute un thread en parallèle et gère elle même son état.
10. **`B`** termine, la machine va enfiler tous les blocs qui commencent par une instruction **`B.termine`** (Les noeuds B en forme de maison inversée).
11. La machine enfile donc le bloc **`QuandBtermine`**.
12. La machine défile un bloc, ici le bloc **`QuandBtermine`**. La machine démarre l'exécution de ce bloc.
13. Le bloc B maison inversé servant juste à se synchroniser avec la fin de l'exécution de B, il n'y a rien d'autre à faire avec lui. On passe directement à l'instruction **`D`** qui affiche dans la console "plus de musique".
14. Fin de l'exécution du bloc **`QuandBtermine`**. La machine va pouvoir défiler un nouveau bloc si il y en a un.
