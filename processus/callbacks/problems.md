# Problèmes avec les callbacks pour gérer l'asynchronisme

Comme vous avez pu le constater dans les exercices précédents, les callbacks sont une solution pour gérer l'asynchronisme mais ils ne sont pas sans poser quelques problèmes.

* Le code apparait complexe au regard de ce qu'aurait été le même code en version synchrone. On se retrouve avec des fonctions imbriquées les unes dans les autres. C'est ce qu'on appelle le [callback hell](http://callbackhell.com/).
* Pour synchroniser des flux parallèles, on est obligé de faire appel à des compteurs ou des tableaux, ce qui rend le code encore plus complexe à relire.
* Il n'y a pas de façon standard de définir la notion d'erreur ou d'exception avec ce modèle. Par exemple : que faire si l'URL du son est invalide ? Chaque API peut définir sa propre façon de gérer les erreurs :
  * Ajoutez un second paramètre callback qui sera appelé en cas d'erreur.
  * Appelez la callback avec un paramètre indiquant si il y a eu succès ou erreur.
  * etc.

Ces problèmes indiquent que les callbacks n'offrent pas un bon niveau d'abstraction pour aborder la programmation asynchrone. Il faut donc trouver une autre solution, c'est ce que nous verrons avec les promesses dans la suite de ce cours.

Nous avons présenté les API asynchrones à base de callback car :

* C'est la façon historique de gérer l'asynchronisme en JavaScript.
* On trouve encore de nombreuses API à base de callback dans les bibliothèques JavaScript.
* Il est aisé de transformer ces API à base de callback en API à base de promesses (ce que nous verrons dans la suite du cours).
