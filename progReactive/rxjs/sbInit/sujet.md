# Exercice : Un chronomètre avec des signaux et avec des observables

Vous allez forker le projet stackblitz suivant : [https://stackblitz.com/edit/ptf-ens-l3m-angular-rxjs-timer-etu](https://stackblitz.com/edit/ptf-ens-l3m-angular-rxjs-timer-etu)

<div style="text-align: center">
    <button onclick = "window.scrollTo(0, 100000)"
            style = "border-radius: 1em; padding: .5em; font-size: 1.5em; background-color: #f0f0f0; border: 1px solid black; margin: 1em; cursor: pointer;"
    >Rendez-vous à la fin de ce sujet pour renseigner l'URL de votre fork</button>
</div>

## Objectif

Nous allons coder un petit chronomètre qui va compter le nombre de demi-secondes écoulées.
Le chronomètre sera piloté par un bouton pour le mettre en marche et pour l'arréter.

Ci dessous le comportement attendu :

<div style="text-align: center">
    <iframe src="https://alexdmr.github.io/exo-timer-signaux-vs-observables/" 
            style="width: 260px; height: 430px; border: solid black 2px;"></iframe>
</div>

## Les types de données

Les données sont définies dans le fichier data.ts.
On définit le chronomètre comme une machine à états finis avec deux états :

* soit le chronomètre est arrêté
* soit le chronomètre est en cours de décompte (et on compte le nombre de demi-secondes écoulées)

A partir de ce type, nous définissons deux constantes :

* **`initialCs`** qui représente l'état initial du chronomètre (à l'arrêt)
* **`countingCs`** qui représente l'état du chronomètre au début du décompte (avec le compteur à zéro)

```typescript
export type CounterState = {readonly type: "stopped"}
                         | {readonly type: "counting", readonly count: number}

export const initialCs: CounterState = {type: "stopped"};
const countingCs: CounterState = {type: "counting", count: 0}
```

On défini ensuite la fonction toggleCounterState qui permet de passer d'un état à l'autre.

```typescript
export function toggleCounterState(cs: CounterState): CounterState {
    return cs.type === "counting" ? initialCs : countingCs;
}
```

En plus de cette machine à état, on définit un type de données AppState qui représente l'état du service (état du chronomètre ainsi que le nombre de fois où le chronomètre a été en cours de décompte). On définit également une valeur initiale pour cet état (initialState).

```typescript
export interface AppState {
  readonly cs: CounterState;
  readonly nbTimeCounting: number;
}

export const initialState: AppState = {
  cs: initialCs,
  nbTimeCounting: 0
}
```

Enfin, on définit un type de données TimerServiceInterface qui représente l'interface que les services de chronomètre doivent implémenter.
Cette interface comprend deux propriétés :

* **`state`** qui est un signal (en lecture seul) qui permet de lire l'état du chronomètre
* **`toggle`** qui est une méthode qui permet de passer d'un état à l'autre

```typescript
export interface TimerServiceInterface {
  readonly state: Signal<AppState>
  toggle(): void;
}
```

## 1) Guide pour coder le chronomètre en version signaux

Nous allons donner des indications pour coder le chronomètre en version signaux.
Cette version est à faire dans le fichier TimerSig.service.ts.

* Déclarez un attribut privé en lecture seul **`sigCount`**`: un signal de nombre initialisé à 0. Nous utiliserons ce signal pour compter le nombre de demi-secondes écoulées quand le chronomètre est en cours de décompte.
* Déclarez un attribut privé en lecture seul **`sigNbTimeCounting`**`: un signal de nombre initialisé à 0. Nous utiliserons ce signal pour compter le nombre de fois où le chronomètre a été en cours de décompte.
* Déclarez un attribut privé en lecture seul **`sigCs`**: un signal de `CounterState`, initialisé à `initialCs`. Nous utiliserons ce signal pour représenter l'état du chronomètre.

A partir des attributs que nous avons définit, recodez le signal **`state`** en le calculant à partir des trois signaux que nous avons définit. Notez que pour le moment, nous ne gérons pas l'incrémentation du compteur sigCount ni ne comptons le nombre de fois où le chronomètre a été en cours de décompte.

Passons maintenant à la méthode toggle :

* Commencez par mettre à jour le signal **`sigCs`** en utilisant la fonction **`toggleCounterState`**.
* Ensuite, selon l'état du chronomètre :
  * Si le chronomètre est en cours de décompte, il faut incrémenter une fois le signal **`sigNbTimeCounting`** et il faut incrémenter le compteur **`sigCount`** toutes les demi-secondes. Pour incrémenter sigCount toutes les demi-secondes, appuyez vous sur la fonction **`setInterval`**, sauvegardez le résultat qu'elle vous renvoie afin de pouvoir l'annuler plus tard.
  * Si le chronomètre est arrêté, il faut annuler l'incrémentation du compteur **`sigCount`** et il faut remettre à 0 le signal **`sigCount`**.

## 2) Guide pour coder le chronomètre en version observables RxJS

Nous allons donner des indications pour coder le chronomètre en version observables RxJS.
Cette version est à faire dans le fichier TimerObs.service.ts.

* Notons qu'il n'y a aucune autre déclaration à faire dans le service, seules la méthode toggle et l'attribut state sont à coder.
* Un petit point sur l'attribut `state`. Nosu devons produire un signal à partir d'un observable. C'est la raison d'être de la fonction `toSignal` fournie par Angular. Cette fonction prend en paramètre l'observable à convertir ainsi qu'optionnellement un objet pour préciser la façon dont le signal sera initialisé avec les valeurs produites par l'observable. Ici nous précisons par exemple que nous allons construire un observable qui produit immédiatement une valeur (à l'aide de `{requireSync: true}`). Le signal pourra donc être initialisé avec cette valeur.
* Nous commençons par la méthode **`toggle`** : produisez une valeur à l'aide du sujet **`click`** (méthode `next`). Notez que comme le sujet en question produit des `void`, il n'y a rien à passer en parémètre de la méthode...
* Tout se passe ensuite dans le `pipe` qui dérive l'observable `click` en un observable produisant des `AppState` :
  * commencez le pipe avec un [accumulateur `scan`](https://rxjs.dev/api/operators/scan). Son rôle sera de produire un nouvel AppState à chaque click en fonction de la valeur du AppState précédent. Initialisez l'accumulateur avec l'AppState initial (`initialState`). La fonction d'accumulation devra changer l'état du chronomètre (en utilisant la fonction `toggleCounterState`) et incrémenter le nombre de fois où le chronomètre a été en cours de décompte (à chaque fois qu'on passera de l'état `stopped` à l'état `counting`).
  * Conservez l'opérateur `startWith`, il indique que votre observable démarre immédiatement avec l'état initial. En effet la fonction d'accumulation décrite dans l'opérateur scan n'est appelée qu'à partir d'une valeur produite par l'observable click. La valeur initiale définie dans scan n'est utilisée que pour initialiser l'accumulateur, pas pour produire une valeur initiale pour l'observable.
  * Vous pouvez déjà tester que votre chronomètre change bien d'état à chaque click, le compteur `nbTimeCounting` devrez lui aussi être mis à jour (dans la fonction d'accumulation de l'opérateur `scan`). Pour le moment, le compteur `count` n'est pas mis à jour.
  * Pour gérer le compteur `count`, nous allons chainer maintenant un opérateur [**`switchMap`**](https://rxjs.dev/api/index/function/switchMap) :
    * Lisez bien la documentation de cet opérateur. Notez bien que cet opérateur prend en paramètre une fonction qui sera appelé avec les valeurs produites par l'observable (ici, switchMap prend place dans un pipe, à un niveau où les valeurs produites sont des `AppState`). Cette fonction doit renvoyer un nouvel observable. C'est cet observable qui sera utilisé pour produire les valeurs de l'observable dérivé de l'observable initial par switchMap. Nous allons voir comment produire cet observable dans la fonction qui paramètre notre switchMap.
    * Si nous sommes dans un état `stopped`, on peut renvoyer un observable qui ne produira qu'une valeur avant de terminer (l'état lui même). Cela peut se faire avec l'opérateur [of](https://rxjs.dev/api/index/function/of) à qui vous passerez en paramètre l'état que vous avez reçu.
    * Si nous sommes dans un état `counting`, alors nous allons renvoyer un observable dérivé de l'opérateur [**`interval`**](https://rxjs.dev/api/index/function/interval) (attention, PAS setInterval). Construisez un observable à partir d'interval, paramétré poru produire des valeurs toutes les demi-secondes. Dérivez le pour produire un état `AppState` qui incrémente `count`.
  * Vérifez que vous avez le comportement attendu. Vérifiez notemment que le compteur `count` est bien incrémenté toutes les demi-secondes ***dès que le chronomètre est en cours de décompte***, si ça n'est pas le cas, relisez bien la documentation de l'opérateur [**`interval`**](https://rxjs.dev/api/index/function/interval).

## 3) Critique des deux versions

Dans une feuille OneNote, dont vous renseignerez l'adresse dans votre StackBlitz, faites une critique de ces deux version (points forts, points faibles, difficultés rencontrées, etc.).

## N'oubliez pas de renseigner l'adresse du fork de votre projet StackBlitz ci-dessous
