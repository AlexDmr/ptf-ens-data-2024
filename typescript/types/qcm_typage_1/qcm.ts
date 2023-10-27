import { QCM } from "src/app/data/QCM";

export const qcm: QCM = { 
    "code": "typescript",
    "answers": [
        { "correct": false, "label": "let v: any" }, 
        { "correct": false, "label": "let v: [boolean, 'true', 'false']" }, 
        { "correct": true , "label": "let v: boolean | 'true' | 'false'" }, 
        { "correct": false, "label": "let v: boolean | string" }, 
        { "correct": false, "label": "let v = 'true' | 'false'" }, 
        { "correct": false, "label": "let v = boolean | 'true' | 'false'" }, 
        { "correct": true , "label": "let v: boolean | `${boolean}`" }, 
        { "correct": false, "label": "let v: boolean & 'true' & 'false'" }
    ] 
}
