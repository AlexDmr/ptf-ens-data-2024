# Le cas des formulaires

En HTML, les formulaires sont un moyen pour les utilisateurs de saisir de l'information.<br/>
Ces saisies se font souvent au travers de balises input.<br/>

Angular ajoute à ces balise input un attribut `[ngModel]` qui permet d'initialiser la valeur représentée par la balise à l'aide d'une exression calculée par rapport à la ***vue-modèle***.

Angular permet aussi de s'abonner aux changements de valeur de ces balises input en utilisant l'attribut `(ngModelChange)`.

Il faut noter que ces attributs sont bien typés en fonction des données qu'ils manipulent.

Voici un StackBlitz pour manipuler un exemple.

<iframe src="https://stackblitz.com/edit/ptf-ens-l3m-angular-base-forms?embed=1&file=src%2Fmain.ts&theme=dark" height="500" width="100%" frameborder="0"></iframe>