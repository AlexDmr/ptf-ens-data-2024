import { QCM } from "src/app/data/QCM";

export const qcmFilter: QCM = { 
    "code": "typescript",
    "answers": [
        { "correct":  true, "label": "const sel = computed( () => L().filter( p => hasSubStringInName(p, str()) ) )" }, 
        { "correct": false, "label": "const sel = signal( L().filter( p => hasSubStringInName(p, str()) ) )"},
        { "correct": false, "label": "const sel = signal<Person[]>( [] ); sel.set( L().filter( p => hasSubStringInName(p, str()) ) )"},
        { "correct": false, "label": "let list = sel(); const nbAgées = computed( () => list.sort( sortByAge ).slice( 0, nb() ) );"},
        { "correct": true, "label": "const nbAgées = computed( () => sel().sort( sortByAge ).slice( 0, nb() ) );"},
        { "correct": false, "label": "let list = sel(); let n = nb(); const nbAgées = computed( () => list.sort( sortByAge ).slice( 0, n ) );"}
    ] 
}
