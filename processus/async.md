# Représentation de processus asynchrones

Reprenons l'exemple précédent et modifions le un peu, voici un psuedo-code qui représente le programme :

```typescript
A; 
B; 
Quand B termine alors exécuter D;
C;
```

avec **`D`** une instruction qui affiche un message "fin" dans le terminal (synchrone).

Voici le déroulement du programme :

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
