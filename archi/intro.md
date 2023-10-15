# Architectures pour les systèmes interactifs

Très grossièrement, nous pouvons représenter un système interactif avec le schéma ci-dessous. Un humain utilise un système interactif au travers de dispositifs physiques d'entrées et de sorties. Le système interactif est du code. Il peut être découpé en deux blocs de code distincts communiquant entre eux : un bloc « Interface » et un bloc « Noyau fonctionnel ».

Un ***dispositif d'entrée*** est tout ce qui permet à la machine de capter des informations à propos de l'humain (par exemple, une souris, un écran tactile, un microphone, un volant, un clavier, une caméra, etc.).

Un ***dispositif de sortie*** est tout ce qui permet à la machine de matérialiser de l'information afin de la rendre perceptible par l'humain (par exemple, un écran, un haut parleur, un vibreur, un volant à retour d'effort, un robot mobile, un compteur de vitesse, etc.).

Le ***Noyau fonctionnel*** est la partie du code qui contient les données et les algorithmes indépendants de tout ce qui touche à la présentation à l'utilisateur. Dans le cas où le système interactif est un traitement de texte, on retrouvera ici les données et algorithmes permettant de coder la structure d'un document (titre, paragraphe, etc.) et d'opérer dessus (copier/coller, sauvegarder/charger, vérifier l'orthographe, etc.)

L'***interface*** est la partie du code qui fait le lien, l'interface, entre le noyau fonctionnel et les dispositifs de sorties. Elle a un rôle de traducteur entre les deux. C'est ici qu'on va coder les éléments graphiques à afficher à l'écran, qu'on va interpréter les données reçues des dispositifs pour les traduire en commandes sur le noyau fonctionnel.

<div style="text-align:center">
    <img src   = "local://assets/archi/ArchiGenerale.png"
         alt   = "Schéma d'un système interactif"
         style = "max-width: min(100%, 808px);"
         />
</div>

Une architecture pour les systèmes interactifs cherche à répondre au problème suivant : « Comment structurer le code d'un système interactif ou d'un élément de système interactif de sorte à minimiser les dépendances entre ce qui relève de la fonctionnalité (noyau fonctionnel) et ce qui relève de l'interaction avec l'utilisateur (interface) ? L'objectif est de pouvoir plus facilement construire et faire évoluer ces systèmes. »

Quelque soit la façon de structurer son code, on cherche à préserver les propriétés suivantes :

* le Noyau Fonctionnel ne connaît pas l’interface, mais fournit des moyens d'être manipulé (annulation/refaire, notifications de changement, vérification de la validité des instructions, etc.) ;
* l’interface connaît le Noyau Fonctionnel. Elle peut lui demander d'effectuer des actions, elle peut s'y abonner pour être prévenu de changements d'états ou d'événements ;
* Tout le code de gestion des dispositifs d'entrée et de sortie est dans la partie interface, et pas du tout dans la partie Noyau Fonctionnel.

Nous allons étudier les patrons de conception MVC/MVP et MVVM qui vont principalement nous guider dans la façon de structurer le code de l'interface. Il posera aussi quelques contraintes sur ce que doit fournir le noyau fonctionnel.
