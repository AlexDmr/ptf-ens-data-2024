# La file des événements

D'une manière générale, en informatique, les événements sont des actions qui se produisent dans le système et dont le système ***« vous »*** informe afin que vous puissiez réagir. Par vous, on entend ici ***« votre code »***. Un exemple simple est que vous avez codé une page web contenant un bouton pour soumettre un formulaire, lorsque l'utilisateur clique sur le bouton, le système déclenche un événement qui préviendra une partie de votre code que le bouton a été cliqué. 

Tous les événements ne sont pas issus d'une action de l'utilisateur, le système peut par exemple générer un événement pour indiquer qu'une vidéo peut commencer à être lue car elle a suffisamment été chargée. 

Lorsque le système produit un événement, il est inséré dans une file. Les événements sont traités au fur et à mesure, c'est-à-dire que pour chaque événement sorti de la file, le système « prévient » les parties de code qui sont intéressées par celui-ci. La figure suivante illustre cette file. Les événements sont enfilés dans l'ordre de leur production par différentes sources (clavier, souris, système de chargement d'image, de vidéo, etc.). Un module de traitement est chargé de défiler les événements et d'exécuter les parties de code « intéressées ».

<div style = "text-align: center; margin: auto;">
    <img src   = "local://assets/progEvent/EventFIFO.png" style="max-width: min(700px, 100%);"/>
</div>