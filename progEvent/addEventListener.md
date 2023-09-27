# S'abonner à des événements via addEventListener

Nous avons vu, dans une partie précédente (Abonnement via les attributs onXXX), qu'il était possible de s'abonner aux événements via les attributs onXXX des éléments HTML.

Il existe un autre moyen, plus précis, de s'abonner à des événements du DOM. Il faut se placer sur un nœud du DOM et demander à s'abonner à un type d'événement particulier lors d'une phase de propagation particulière (1: capture, 2: target, 3: bubbling). Lorsqu'on s'abonnait via les attributs onXXX, l'abonnement était fait implicitement pour la phase de bubbling. Avec la méthode addEventListener, il est possible de s'abonner en phase de bubbling mais aussi en phase de capture. La méthode ***addEventListener*** prends trois paramètres (voir [MDN](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)) :

* Le nom de l'événement auquel on souhaite s'abonner (par exemple, « click »). 
* La fonction de rappel à appeler lorsque cet événement sera détecté par le nœud. On appelle cette fonction une « callback ». Le type de cette fonction est (event: Event) => 
* Le troisième paramètre est optionnel et peut être :
    *soit un booléen indiquant qu'on s'abonne à la phase de capture (valeur vraie) ou à la phase de bubbling (valeur fausse et valeur par défaut).
    * soit un objet contenant trois attributs optionnels :
        * capture : un booléen indiquant si on s'abonne à la phase de capture (bubbling, sinon),
        * once : un booléen indiquant si l'abonnement est révoqué après son premier appel.
        * passive : un booléen indiquant que la fonction de rappel (callback) n'appellera jamais preventDefault() sur l'événement. Cela a pour but d'optimiser les performances, le défilement de la page en particulier.

Par exemple, pour s'abonner aux événements « click » sur le corps du document en phase de capture et afficher l'événement dans la console, l'instruction peut être :
```typescript
document.body.addEventListener( "click", console.log, true);
```

Autre exemple, en supposant que p référence un paragraphe, on peut par exemple s'abonner au fait que le pointer de la souris entre dans la zone graphique où le paragraphe est rendu. Supposons qu'on veut ici afficher dans la console le texte ***"On entre dans le paragraphe..."***. Supposons aussi qu'on ne veut déclencher la fonction qu'une seule fois, lors de la phase de bubbling. Cela peut se faire avec l'instruction suivante :

```typescript
p.addEventListener("mouseenter", () => console.log("On entre dans le paragraphe..."), {capture: false, once: true} ) 
```

Plus formellement les types de la méthode et de ses paramètres sont les suivants :
```typescript
type addEventListenerTYPE = (
  eventType: string,
  listener: (evt: Event) => void,
  options?: boolean | AddEventListenerOptions
) => void;

interface AddEventListenerOptions {
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
}
```

## Abonnements multiples et désabonnement
Notons qu'avec la méthode **addEventListener** il est possible d'avoir plusieurs abonnements pour un même événement sur un même nœud. On peut par exemple s'abonner à la phase de capture et à la phase de bubbling :

```typescript
function fC(e: MouseEvent) {
  console.log("phase capture  : mouseenter", e.composedPath() );
}
function fB(e: MouseEvent) {
  console.log("phase bubbling : mouseenter", e.composedPath() );
}

document.body.addEventListener("click", fC, {capture: true } );
document.body.addEventListener("click", fB, {capture: false} );
```

Il est possible de se désabonner via la méthode removeEventListener. Il faut alors donner en paramètre le type d'événement, la référence de la fonction et la phase (capture ou bubbling) d'une manière similaire à ce qui se fait pour addEventListener :

```typescript
document.body.removeEventListener("click", fC, {capture: true } );
document.body.removeEventListener("click", fB, {capture: false} );
```
