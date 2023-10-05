# La notion de composant

Cette section introduit les bases pour commencer à utiliser Angular dans vos projets.
Nous allons nous concentrer pour le moment sur des projets simples dans lesquels nous allons travailler sur un seul composant.

Un composant Angular est à minima composé de deux parties :

* ***la vue*** : c'est le template HTML ainsi que des ressources CSS qui seront affichés dans le navigateur.
La *vue* définie la structure HTML (fichier HTML) ainsi que la mise en page (fichiers CSS) qui sera utilisé pour matérialiser les données à l'utilisateur (sous forme d'une page Web).
* ***la vue-modèle*** : c'est la partie va contenir les données et les méthodes qui vont être utilisées dans la vue.

<figure style="text-align: center">
    <img    src="assets/archi/schema_VI.3.1_Plan_de_travail_1.png"
            style="max-width: min(100%, 640px);"
            />
    <figcaption>
        <b>Un composant Angular</b> se compose d'une vue et d'une vue-modèle. 
        Ces deux parties sont liées par un mécanisme de data-binding.
        La vue-modèle peut être liée à des services, nous discuterons de cela dans une autre section.
    </figcaption>
</figure>

## La vue

La vue est définie par un fichier HTML et un ou plusieurs fichiers CSS.
Angular étend le HTML en ajoutant des balises et des attributs qui permettent de définir des composants et de les lier entre eux. Nous verrons comment faire cela quand nous aborderons les détails du data-binding.
Nous présentons ci dessous un exemple de fichier HTML utilisé par un composant dont le but serait d'afficher une température fournie par un signal ***temp***. Notez comment temp est placé entre double accolades. C'est une syntaxe spécifique à Angular qui permet de lier la vue et la vue-modèle (voir le data-binding). Dans la même veine, notez l'attribut ***click*** qui permet de lier un événement à une méthode de la vue-modèle (lorsqu'on cliquera sur la div, la méthode updateTemp sera appelée).

Cette vue définie une div qui contient deux spans. Le premier affiche la valeur de la température et le second affiche l'unité (°C). Lorsque l'utilisateur cliquera sur la div, la méthode updateTemp sera appelée et la température sera mise à jour.

```html
<div class="temperature" (click)="updateTemp()">
    <span class="temperature__value">{{temp()}}</span>
    <span class="temperature__unit">°C</span>
</div>
```


## La vue-modèle

La vue-modèle est définie par une classe. C'est dans cette classe qu'on va définir les données et les méthodes qui seront utilisées par la vue. Dans l'exemple ci-dessous, on définit une classe ***AppComponent*** qui contient un attribut ***temp*** de type ***Signal&lt;number&gt;*** et une méthode ***updateTemp*** qui met à jour le signal ***temp***.

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly temp = signal<number>(10);

  updateTemp() {
    this.temp.set( Math.floor(Math.random() * 100) );
  }
}
```

## Le data-binding

Reprenons le code ci-dessus, vous avez noté que la définition de la classe ***AppComponent*** est précédée par par un appel au décorateur ***@Component***. Ce décorateur permet de définir les propriétés du composant. Il indique que lorsque la balise ***&lt;app-root>*** sera utilisée dans un fichier HTML, alors Angular va :

1. Instancier la classe ***AppComponent***. Nous appelerons dans la suite du texte cette instance ***app***.
2. Instancier un fragment HTML à partir du template défini dans le fichier ***app.component.html***. Le code CSS défini dans le fichier ***app.component.scss*** sera également utilisé pour mettre en forme le fragment HTML. Nous appelerons dans la suite du texte ce fragment ***fragment***.
3. Injecter le fragment ***fragment*** à l'intérieur de la balise ***&lt;app-root>***.
4. Lier ***fragment*** à ***app*** de sorte à ce que le clique sur la balise div contenue dans ***fragment*** engendre un appel à la méthode ***updateTemp*** de ***app***. De même, la valeur de l'attribut ***temp*** de ***app*** sera affichée dans le span ***temperature__value*** de ***fragment*** et sera mise à jour à chaque fois que le signal ***temp*** sera modifié.

Le mécanisme du processus que nous venons de décrire est la base de ce qu'on appelle ***le data-binding***. Il permet de lier la vue et la vue-modèle. Ce mécanisme représente l'atout majeur des frameworks à composants comme Angular. 

Il existe plusieurs types de data-binding, nous en verrons quelques uns dans la suite de ce cours.
