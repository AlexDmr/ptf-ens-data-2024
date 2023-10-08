import { QCM } from "src/app/data/QCM";

export const qcmAboDesabo: QCM = { 
    "answers": [
        { "correct": false, "label": "L'injection de dépendance se fait par les import au début des fichiers." }, 
        { "correct": true, "label": "L'injection de dépendance se fait en définisssant un paramètre de type service dans le constructeur des compoants." }, 
        { "correct": false, "label": "Un service est toujours un singleton au niveau de l'application" }, 
        { "correct": true, "label": "Un service est un singleton au niveau du contexte qui le fourni (Application, module, composant, ...)" }
    ] 
}
