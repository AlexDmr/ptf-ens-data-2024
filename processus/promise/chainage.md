# Synchroniser les promesses pour gérer le flux d'exécution asynchrone

Pour exécuter du code après qu'une promesse est résolue (qu'elle soit dans l'état fullfilled ou rejected), les promesses proposent les méthodes then, catch et finally :

then ( cbOnResolve, cbOnReject) : La méthode then prend en paramètres optionnels deux arguments qui sont des callbacks. cbOnResolve sera appelée avec pour paramètre le résultat de la promesse, si cette dernière termine dans l'état fullfilled. cbOnReject sera appelée avec pour paramètre la raison de l'échec de la promesse, si cette dernière termine dans l'état rejected.
catch (cbOnReject) : est un raccourci pour écrire then(undefined, cbOnReject).
finally (cb) : est un raccourci pour écrire then(cb, cb).
La méthode then sur une promesse P renvoie elle-même une promesse. Supposons l'instruction suivante : P.then(cbOnResolve, cbOnReject), cette instruction renvoie une promesse P' :

Si P est fullfilled, alors :
Si cbOnResolve n'est pas défini, alors P' est fullfilled et contient la valeur de résolue par P.
Si cbOnResolve est défini et que cette dernière renvoie une promesse, alors P' est cette promesse.
Si cbOnResolve est défini et renvoie R et que R est autre chose qu'une promesse, alors P' est fullfilled et contient R.
Si P est rejected, alors :
Si cbOnReject n'est pas défini, alors P' est P.
Si cbOnReject est défini et que cette dernière renvoie une promesse, alors P' est cette promesse.
Si cbOnReject est défini et renvoie R et que R est autre chose qu'une promesse, alors P' est fullfilled et contient R.
