# Asynchronisme avec des callbacks

XXX Les callbacks... déjà utilisé pour la prog événementielle ... ça peut aussi s'appliquer ici (quand instruction asynchrone démarre, faire..., quand instruction asynchrone termine, faire ...)



Une façon de gérer les instructions asynchrones est d'utiliser un mécanisme de fonction de rappel (callback). Cela s'applique pour l'utilisation d'instructions qui sont des appels de fonctions. L'idée est d'ajouter un paramètre de type callback à la fonction asynchrone, cette callback devant être appelée lorsque l'instruction termine.

Prenons l'exemple de l'instruction de lecture d'une musique que nous avons utilisé précédemment. En supposant une version synchrone de cette instruction permettant de lire une musique donnée via une URL :

function lireMusique(url) {...}

alors la version asynchrone utilisant des callbacks serait :

function lireMusique(url, cb) {...}

avec cb la fonction de rappel.

Le type de la fonction de rappel (c'est-à-dire les paramètres le types de ses paramètres ainsi que son type de retour) est défini par le concepteur de la fonction. A minima, on s'attend à ce que cette fonction prenne en paramètre le résultat de la fonction. Il existe plusieurs conventions pour décider de la signature de la callback, selon les bibliothèques utilisées.
