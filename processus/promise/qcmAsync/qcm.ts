import { QCM } from "src/app/data/QCM";

export const qcmFilter: QCM = { 
    "answers": [
        { "correct": false , "label": "f peut manipuler des promesses, ce qu'elle ne pourrait pas faire si elle n'était pas déclarée comme async." }, 
        { "correct": true  , "label": "On peut utiliser l'instruction await dans le corps de f." }, 
        { "correct": true  , "label": "f renvoie nécessairement une promesse." }, 
        { "correct": false , "label": "On ne pourra utiliser le résultat de f qu'avec l'instruction async (ex: const res = await f())" }
    ] 
}
