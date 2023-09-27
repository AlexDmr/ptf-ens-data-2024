import { GraphCourse } from "src/app/data/graph";

export const savedGraph: GraphCourse = {
    title: "Pas de cours...",
    courses: []
};
export const oldSavedGraph: GraphCourse = {
    "title": "CL&IHM",
    "courses": [
        {
            "id": 1,
            "title": "Typescript",
            "type": "course",
            "coords": {
                "x": 69,
                "y": 99,
                "width": 320,
                "height": 240
            },
            "inputs": [],
            "outputs": [],
            "sections": [
                {
                    "title": "Les attendus",
                    "id": 1,
                    "type": "markdown",
                    "URL": "typescript/attendus.md",
                    "pages": [],
                    "exercises": []
                },
                {
                    "title": "Qu'est ce que Typescript ?",
                    "id": 2,
                    "type": "markdown",
                    "URL": "typescript/whatIsTypescript.md",
                    "pages": [
                        {
                            "id": 1,
                            "title": "Les types de bases",
                            "type": "markdown",
                            "URL": "typescript/types_de_bases.md"
                        },
                        {
                            "id": 2,
                            "title": "QCM JS / TS",
                            "type": "exo",
                            "URL": "typescript/ts_vs_js.exo.ts"
                        }
                    ],
                    "exercises": []
                },
                {
                    "id": 3,
                    "title": "Les fonctions et leurs types",
                    "type": "markdown",
                    "URL": "typescript/fonctions_intro.md",
                    "pages": [
                        {
                            "id": 1,
                            "title": "Exercice : Définition d'une fonction",
                            "type": "exo",
                            "URL": "typescript/definition_fonction.exo.ts"
                        },
                        {
                            "id": 2,
                            "title": "La notion de closure",
                            "type": "markdown",
                            "URL": "typescript/closure.md"
                        }
                    ],
                    "exercises": []
                }
            ]
        },
        {
            "id": 2,
            "title": "pipo",
            "type": "exo",
            "coords": {
                "x": 613,
                "y": 72,
                "width": 160,
                "height": 200
            },
            "inputs": [],
            "outputs": []
        }
    ]
}