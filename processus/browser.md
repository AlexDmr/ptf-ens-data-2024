# Dans le navigateur

Dans le navigateur Web, le moteur Javascript est mono-threadé.
Cela signifie que le moteur Javascript ne peut exécuter qu'une seule instruction à la fois.
Cependant, le navigateur est capable d'exécuter des instructions asynchrones (ex: fetch, setTimeout, etc.) et de réagir à des événements (ex: clic, chargement d'une image, etc.) sans bloquer l'exécution du programme.

Cela signifie que le moteur gère une file d'attente d'instructions asynchrones et d'événements à traiter.
Lorsqu'une instruction asynchrone est démarrée, elle est placée dans cette file d'attente et le moteur passe à l'instruction suivante.

Bien entendu, le moteur gère en sous main des threads, mais il ne les expose pas à l'utilisateur, vous ne pouvez pas en créer vous même (les plus curieux peuvent cependant jeter un coup d'oeil aux [Web Workers](https://developer.mozilla.org/fr/docs/Web/API/Web_Workers_API) qui permettent de créer et de communiquer avec d'autres instances du moteur Javascript).

Reprenons l'exemple précédent, l'instruction **`B`** est asynchrone, lorsqu'elle est exécuté (case rectangulaire B du schéma), le navigateur ne bloque pas tout le système, ce qui signifie qu'en sous main il va démarrer ou utiliser un autre thread pour lire la musique. Lorsque la musique est terminée, le navigateur va réagir, marquer l'instruction **`B`** comme étant terminé, ce qui va pousser dans la file d'instructions à exécuter l'instruction **`D`**.

<div style="text-align: center">
  <!--
  exemple => A; B-; C;
  QuandBtermineAlorsExecuterD => -B; D;
  -->
  <img src="assets/processus/processus.exemple.svg" alt="Représentation de l'exemple" style="width: min(100%, 150px);"/>
</div>
