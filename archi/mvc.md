# Patron de conception MVC/MVP

Il existe plusieurs variantes du modèle MVC. Ne vous étonnez donc pas si vous avez déjà entendu parler de façon un peu différente de MVC par rapport à ce que nous allons dire dans ce cours. MVC est, en particulier, utilisé pour modéliser la façon dont une application sur serveur web est structurée pour traiter les requêtes utilisateur et renvoyer des ressources (pages HTML ou autres) aux clients web. **Ce n'est pas ce MVC que nous allons étudier dans ce cours !**

Nous étudierons, ici, une variante nommée **MVP**, qui est bien adaptée à la structuration de systèmes interactifs, fonctionnant sur une même machine. Ce patron de conception est employé pour des applications web fonctionnant sur le client (ex : des applications réalisées avec Angular) comme pour des applications natives.

MVP est l'acronyme de Model-View-Presenter. MVP peut être utilisé pour modéliser une application dans son ensemble ou des composants de cette application. Dans ce dernier cas, l'application est composée de plusieurs composants MVP liés entre eux. Nous ne détaillerons pas dans ce cours comment construire une application utilisant plusieurs composants MVP, en effet nous verrons cela dans la partie dédiée à Angular, qui fournit des moyens élégants de le faire.

Le schéma suivant illustre comment Model, View et Presenter communiquent entre eux. Le **modèle** est une structure (généralement, un objet) donnant accès à des éléments du noyau fonctionnel (c'est rarement le noyau lui-même). La **vue** décrit la façon dont l'interface doit être rendue perceptible à l'utilisateur (par exemple, en utilisant des éléments graphiques ou sonore). Enfin, le **présentateur** à un rôle de traducteur entre la vue et le modèle. D'une part, il s'abonne aux événements utilisateur produits par la vue (ex : clic sur bouton, mot-clé prononcé, etc.) et traduit cela en commandes ou mise à jour du modèle. D'autre part, il observe le modèle qui peut le prévenir de changements d'états ou d'événements et met à jour la vue en conséquence.

<div style="text-align:center">
    <img src   = "assets/archi/schema_V.2.2_Plan_de_travail_1_Plan_de_travail_1.png"
         alt   = "Schéma d'un système interactif"
         style = "max-width: min(100%, 500px);"
         />
</div>
