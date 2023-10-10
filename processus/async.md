# Représentation de processus asynchrones

Reprenons l'exemple précédent et modifions le un peu, voici un psuedo-code qui représente le programme **`exemple`** :

```typescript
A; 
B; 
Quand B termine alors exécuter D;
C;
```

avec **`D`** une instruction qui affiche un message "fin" dans le terminal (synchrone).

Voici le déroulement du programme **`exemple`** :

* 1 Dans le terminal, le message "début" s'affiche.
* 2 Le système note qu'il faut exécuter **`B`**.
* 3 Le système note que lorsque B sera terminé, il faudra exécuter **`D`**.
* 4 Dans le terminal, le message "fin" s'affiche.
* 5 Le système a terminé la lecture du bloc d'instruction :

  * 5-a il regarde si il y a autre chose à faire.
  * 5-b Il trouve qu'il faut exécuter **`B`**.
  * 5-c Il exécute B, la musique commence et dure 2 minutes.
  * 5-d Rien n'est bloqué.

* 6 La musique se termine. Le système réagit et exécute l'instruction `Quand B termine alors exécuter D`
* 7 Le système exécute **`D`**.

Le schéma suivant résume graphiquement ce qui se passe :

* Le temps, du moins le temps logique, est représenté de haut en bas.
* Les noeuds ovals représentent les instructions synchrones
* Les noeuds en forme de maison représentent les instructions asynchrones
* Les noeuds en forme de maison inversée représentent les instructions qui sont exécutées lorsque l'instruction asynchrone qui les précède est terminée.
* Les flèches plaines représentent la notion de séquence synchrone (ex: on fait A, puis on démarre B, puis on fait C)
* Les flèches pointillées représentent la notion de séquence asynchrone (ex: on fait A, puis on démarre B, puis on fait C, puis on démarre D)
* Les grands rectangles représentent des blocs d'instructions qui vont être exécutés de manière synchrone (les instructions asynchrones sont démarrées mais ne bloquent pas l'exécution du bloc).

<div style="text-align: center">
  <img src="assets/processus/processus.exemple.svg" alt="Représentation de l'exemple" style="width: min(100%, 150px);"/>
</div>
