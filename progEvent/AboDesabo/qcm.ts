import { QCM } from "src/app/data/QCM";

export const qcmAboDesabo: QCM = { 
    "answers": [
        { "correct": false, "label": "Parce qu'on s'abonne justement. Tous les abonnements sont faits et on est donc prévenu." }, 
        { "correct": false, "label": "C'est un bug." }, 
        { "correct": true , "label": "L'événenement click s'est d'abord propagé jusqu'au bouton. La fonction liée au click sur le bouton a été appelée. Elle a abonnée document.body aux événements click en phases capture et bubbling. L'événement est ensuite remonté (phase bubbling) et a été intercepté au niveau de document body." }, 
        { "correct": false, "label": "Parce que les seuls abonnements faits sont ceux des boutons." }
    ] 
}
