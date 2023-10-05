import { QCM } from "src/app/data/QCM";

export const qcmAboDesabo: QCM = { 
    "answers": [
        { "correct": false, "label": "MVC et MVP sont deux noms d'un même patron de conception." }, 
        { "correct": true , "label": "MVP utilise le patron de conception observateur/observable." }, 
        { "correct": false, "label": "Présentateur, modèle et vue sont tous les trois à la fois observateurs et observables." }, 
        { "correct": true , "label": "On peut avoir plusieurs composant MVP pour un même système interactif, liés les uns aux autres de sorte à structurer ce système interactif." }, 
        { "correct": false, "label": "Lorsque le présentateur reçoit un événement de la vue, il le traîte en mettant à jour le modèle et la vue." },
        { "correct": false, "label": "Lorsque le présentateur reçoit un événement de la vue, il le traîte en mettant à jour la vue seulement." },
        { "correct": true , "label": "Lorsque le présentateur reçoit un événement de la vue, il le traîte en mettant à jour le modèle seulement." },
        { "correct": true , "label": "MVVM spécialise MVP en ajoutant la notion de data-binding entre la vue et le présenteur." },
        { "correct": false, "label": "MVVM spécialise MVP en ajoutant la notion de data-binding entre le modèle et le présenteur." },
        { "correct": true , "label": "Un composant Angular instancie toujours une vue." },
        { "correct": true , "label": "Un composant Angular instancie toujours une vue-modèle." },
        { "correct": false, "label": "Un composant Angular instancie toujours un modèle." },
        { "correct": false, "label": "Le programmeur instancie un composant Angular de classe C définisssant une balise <app-c> en utilisant new C()" },
        { "correct": true , "label": "Le programmeur instancie un composant Angular de classe C définisssant une balise <app-c> en utilisant une balise <app-c> dans la vue d'un composant parent." }
    ] 
}
