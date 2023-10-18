# Exercice : Une file d'appel contrainte

Vous allez forker le projet stackblitz suivant : ***XXX***

<div style="text-align: center">
    <button click = "window.scrollTo(0, 100000)"
            style = "border-radius: 1em; padding: .5em; font-size: 1.5em; background-color: #f0f0f0; border: 1px solid black; margin: 1em; cursor: pointer;"
    >Rendez-vous à la fin de ce sujet pour renseigner l'URL de votre fork</button>
</div>

## Objectif

Nous allons implémenter une file d'appel contrainte par un nombre maximal d'appels simultanés. Nous simulerons un service d'accès à un serveur et un service client qui devra communiquer avec ce serveur en respectant un nombre maximum d'appel par durée de temps.

Nous implémenterons cela en nous basant sur les observables RxJS et les promesses. Soyez sur de bien avoir compris ce que font les unes et les autres avant de commencer.

## L'API *"serveur"*

Nous simulerons l'accès à un serveur à l'aide du service `ServerService`. De ce service, la seule chose que vous avez à connaitre est la méthode `doSomething` :

```typescript
async doSomething(action: ACTION): Promise<RESPONSE>;
```

avec :

```typescript
export type ACTION = string;

export interface RESPONSE {
  readonly action: ACTION;
  readonly callNumber: number;
}
```

La réponse n'a ici pas d'intérêt particulier, si ce n'est de nous permettre de vérifier que nous avons bien reçu la réponse attendue.

Le serveur définit également une configuration `config` qui se compose des attributs `maxCall` et `timeRange` qui spécifie la sémantique suivante : les serveur ne peut traiter que `maxCall` sur une période de `timeRange` millisecondes.

## L'API *"client"*

C'est le service client `ClientService` que vous devrez implémenter. Il expose la méthode `callAction` que vous devrez réimplémenter :

```typescript
async callAction(action: ACTION): Promise<RESPONSE>
```

C'est dans ce service que vous devez coder votre file d'appel. Vous devez respecter la contrainte suivante : **vous ne pouvez pas appeler le serveur plus de `maxCall` fois sur une période de `timeRange` millisecondes** (respectivement définits à 5 et 1000).

## Résultat attendu

Voici ce que ça devrait donner, :

<iframe src="https://alexdmr.github.io/l3m-2023-2024-rxjs-fifo/"
        style="width: 100%; height: 200px; border: solid black 1px; border-radius: 0.5em; overflow: hidden;"
></iframe>
