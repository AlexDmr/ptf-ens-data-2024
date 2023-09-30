# Le patron de conception Observateur/Observable

LE patron de conception observateur/observable permet de mettre en oeuvre des systèmes réactifs simples. Il est très utilisé dans les systèmes interactifs (mais pas seulement) et vous apprendrez à le reconnaitre dans de très nombruex systèmes exisants.

On appelle « patron de conception » une solution bien établie à un problème récurrent. Un problème est dit « récurent » si on le rencontre régulièrement en pratique. Une solution est dite « bien établie » si les praticiens reconnaissent qu'elle est utile pour résoudre le problème et s'ils l'utilisent. Le patron de conception Observateur/Observable est donc une solution bien établie à un problème récurrent, nous allons donc décrire à quel problème il s'adresse et quelle solution il propose.

Problème : On a un fragment de code qui doit prévenir d'autres fragments de codes que quelque chose s'est produit. Ces fragments de codes peuvent être des objets, des modules, des composants, etc. Le problème se pose, de manière générale, indépendamment de la structure de ces fragments. 

Une solution bien éprouvée à ce problème est le patron de conception Observateur/Observable. Le fragment de code qui doit prévenir les autres est appelé « **observable** ». Les fragments de code qui doivent être prévenus sont appelés « **observateurs** ». **L'observable** doit fournir le moyen aux **observateurs** de s'abonner et de se désabonner des informations qu'il peut émettre. Il dispose d'un mécanisme de **notification** pour prévenir les observateurs.

Le schéma suivant illustre cela : 1) **L'observateur** commence par s'abonner auprès de **l'observable**. Ce dernier enregistre l'abonnement et 2) notifie **l'observateur** à chaque fois qu'il le doit (zéro ou plusieurs fois). Une fois que **l'observateur** n'est plus intéressé ou qu'il est détruit alors 3) il se désabonne de **l'observable**.

<div style="text-align:center">
    <img src="assets/progReactive/Schema_IV.2.gif" alt="Schéma du patron de conception Observateur/Observable" style="max-width: 400px;" />
</div>
