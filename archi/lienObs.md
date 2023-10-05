# Liens entre MVC/MVP et Observateur/Observable

Le patron de conception MVP définit trois blocs liés entre eux par des relations de type observateur/observable. Le présentateur y joue le rôle d'observateur de la vue et du modèle.

La vue joue le rôle d'observable. Elle est observée par le présentateur qui joue donc le rôle d'observateur de la vue. La vue émet des événements utilisateurs (clic souris, par exemple) qui sont interprétés par le présentateur. Ce dernier peut alors éventuellement demander au modèle d'exécuter des actions qui traduisent les intentions de l'utilisateur (ex : clic sur une case -> poser un pion sur cette case).

Indépendamment de cela, le modèle joue le rôle d'observable. Il est observé par le présentateur qui joue donc le rôle d'observateur du modèle. Le modèle émet des événements relatifs à des changements d'état (par exemple, le plateau a changé, le joueur courant a changé). En fonction de ce changement d'état, le présentateur met alors à jour la vue.

<div style="text-align:center">
    <img src   = "assets/archi/schema_V.2.3_Plan_de_travail_1.png"
         alt   = "Schéma d'un système interactif"
         style = "max-width: min(100%, 672px);"
         />
</div>
