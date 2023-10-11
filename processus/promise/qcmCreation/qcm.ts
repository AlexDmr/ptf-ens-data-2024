import { QCM } from "src/app/data/QCM";

export const qcmFilter: QCM = { 
    "code": "typescript",
    "answers": [
        { "correct": true  , "label": "function fp() {return new Promise( resolve => f(resolve) ) }" }, 
        { "correct": false , "label": "function fp() {return f()}" }, 
        { "correct": false , "label": "function fp() {return Promise.resolve(f) }" }, 
        { "correct": false , "label": "function fp() {return Promise.resolve(f()) }" }, 
        { "correct": true  , "label": "function fp() {return new Promise( f ) }" }, 
        { "correct": false , "label": "function fp() {return new Promise( f() ) }" }, 
        { "correct": false , "label": "function fp() {return new Promise( resolve => resolve(f) ) }" }
    ] 
}
