import { STRQCM } from "src/app/data/QCM";

export const qcm: STRQCM = `
NOK : T est un type générique.
 OK : K est un type générique.
 OK : V est un type générique.
NOK : this est un type générique.
NOK : Le type de retour de get est V.
 OK : Le type de retour de get est V | undefined.
 OK : Le type du paramètre key de get est K.
NOK : Le type du paramètre key de get est inconnu.
 OK : V | undefined est le type union des types V et undefined.
NOK : undefined est présent ici pour indiquer que la méthode get n'est pas toujours définie.
`;