import { QCM } from "src/app/data/QCM";

export const qcmAboDesabo: QCM = {
    "code": "typescript",
    "answers": [
        { "correct": false, "label": "constructor(private L:  readonly number[], private f: (a: number) => Person) {\n  const L2 = L.map(f)\n}" }, 
        { "correct": false, "label": "@Input() L2: readonly Person[];\nconstructor(private L:  readonly number[], private f: (a: number) => Person) {\n  this.L2 = L.map(f);\n}" }, 
        { "correct": false, "label": "@Input({required: true}) L: readonly number[];\n@Input({required: true}) f: (a: number) => Person;\nreadonly L2: readonly Person[];\nconstructor() {\n  this.L2 = this.L.map(this.f);\n}" }, 
        { "correct": true , "label": "interface STATE {\n  readonly L: readonly number[];\n  readonly f: (a: number) => Person;\n  readonly L2: readonly Person[];\n}\n@Component({...})\nclass C {\n  private _L = signal<readonly number[]>([])\n  @Input({required: true}) \n    get L( ) { return this._L() }\n    set L(v) { this._L.set(v)   }\n  private _f = signal<(a: number) => Person>( () => person )\n  @Input({required: true})\n    get f( ) { return this._f }\n    set f(v) { this._f.set(v) }\n  readonly state = computed<STATE>( () => ({\n    L: this._L(),\n    f: this._f(),\n    L2: this._L().map( this._f() )\n  }) );\n}" }, 
        { "correct": false, "label": "private _L = signal<readonly number[]>([])\n@Input({required: true}) \n  get L( ) { return this._L() }\n  set L(v) { this._L.set(v)   }\nprivate _f = signal<(a: number) => Person>( () => person )\n@Input({required: true})\n  get f( ) { return this._f }\n  set f(v) { this._f.set(v) }\nreadonly L2 = computed<readonly Person[]>( () => this._L().map(this._f) );" }
    ] 
}
