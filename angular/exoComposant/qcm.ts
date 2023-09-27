import { STRQCM } from "src/app/data/QCM";

export const qcm: STRQCM = `
NOK : Le code de la vue modèle est dans le fichier app.component.ts
 OK : Le code de la vue modèle est dans le fichier main.ts
 OK : La bordure et le fond jaune sont définis dans le fichier app.component.scss
NOK : La bordure et le fond jaune sont définis dans le fichier app.component.html
 OK : Le composant est déclaré dans le fichier main.ts
NOK : Le composant est instancié dans le fichier main.ts
 OK : Le composant est instancié dans le fichier index.html
NOK : Le composant est instancié dans le fichier app.component.html
NOK : On utilise un new pour instancier le composant
 OK : On utilise une balise html <my-app> pour instancier le composant
NOK : On utilise une balise html <app-root> pour instancier le composant
NOK : temp est un signal immuable car il est readonly
 OK : temp est un signal mutable
 OK : L'attribut temp est immuable
NOK : L'attribut temp est mutable
`;