export interface EXO_BASE {
    readonly title: string;
    readonly type: "stackBlitz" | "qcm" | "git";
    readonly statementURL: string;
}

export type EXO = ExoQCM | ExoStackBlitz | ExoGit;

export interface ExoQCM extends EXO_BASE{
    readonly type: "qcm";
    readonly qcmURL: string; 
}

export interface ExoStackBlitz extends EXO_BASE {
    readonly type: "stackBlitz";
    readonly stackBlitzURL: string;
}

export interface ExoGit extends EXO_BASE {
    readonly type: "git";
    readonly gitURL: string;
}

export async function strToExo(str: string): Promise<EXO | undefined> {
    const posStart = str.indexOf("{", str.indexOf("{") + 1);
    const posEnd = str.lastIndexOf("}");
    try {
        const exo = JSON.parse( str.slice( posStart, posEnd + 1 ) ) as EXO;
        return exo;
    } catch(err) {
        console.error( err );
        console.error( "str:", JSON.stringify(str) );
        console.error( posStart, posEnd, str.slice( posStart, posEnd + 1 ) );
        return undefined;
    }
}

export type InstanceExo = InstanceExoQCM | InstanceExoStackBlitz | InstanceExoGit;
export interface InstanceExoQCM {
    readonly exo: ExoQCM;
    readonly answers: readonly boolean[];
    readonly nbTry: number;
}

export interface InstanceExoStackBlitz {
    exo: ExoStackBlitz;
    forkURL: string;
}

export interface InstanceExoGit {
    exo: ExoGit;
    forkURL: string;
}

export function getInstanceExoFromExo(exo: EXO): InstanceExo {
    switch (exo.type) {
        case "qcm": return {exo, answers: [], nbTry: 0}
        case "stackBlitz": return {exo, forkURL: ""}
        case "git": return {exo, forkURL: ""}
    }
}

export function isExoQcm(exo: EXO): exo is ExoQCM {return exo.type === "qcm"}
export function isExoGit(exo: EXO): exo is ExoGit {return exo.type === "git"}
export function isExoStackBlitz(exo: EXO): exo is ExoStackBlitz {return exo.type === "stackBlitz"}

export function isInstanceExoQcm(ie: InstanceExo): ie is InstanceExoQCM {return ie.exo.type === "qcm"}
export function isInstanceExoGit(ie: InstanceExo): ie is InstanceExoGit {return ie.exo.type === "git"}
export function isInstanceExoStackBlitz(ie: InstanceExo): ie is InstanceExoStackBlitz {return ie.exo.type === "stackBlitz"}
