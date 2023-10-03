import { QCM } from "src/app/data/QCM";

export const qcmFilter: QCM = { 
    "code": "typescript",
    "answers": [
        { "correct": false, "label": "filter( f: (e?: number, i?: number) => boolean ): number[]" }, 
        { "correct": true , "label": "filter( f: (e?: T, i?: number) => boolean ): T[]" }, 
        { "correct": false, "label": "filter( f: (e?: number, i?: number) => boolean ): T[]" }, 
        { "correct": false, "label": "filter<U>( f: (e?: U, i?: number) => boolean ): U[]" }
    ] 
}
