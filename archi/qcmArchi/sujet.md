# Exercice : Abonnement et désabonnement
Cet exercice a pour but de bien vous faire comprendre comment les événements se propagent et comment les fonctions de rappels sont appelées au cours de la propagation.

Deux boutons permettent d'abonner et de désabonner le corps du document HTML (document.body) aux événements de type click. Un abonnement est fait qui correspond à la phase de capture et un autre est fait qui correspond à la phase de bubbling.

<iframe src="https://stackblitz.com/edit/theme-ihm-abo-listener?embed=1&file=index.ts&hideExplorer=1"
        style="width: 100%; height: 500px;"></iframe>

<hr/>

## QUESTION : Explication de trace
Au départ, aucun abonnement, hormis ceux des boutons, n'est fait.

Pourquoi observe-t-on dans la console une trace "phase bubbling : click" lorsqu'on clique sur le bouton ABONNER ?