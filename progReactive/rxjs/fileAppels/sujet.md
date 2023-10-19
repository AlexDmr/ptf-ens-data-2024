# Exercice : Une file d'appel contrainte

Vous allez forker le projet stackblitz suivant : [https://stackblitz.com/edit/ptf-ens-l3m-rxjs-fifo-etu](https://stackblitz.com/edit/ptf-ens-l3m-rxjs-fifo-etu)

<div style="text-align: center">
    <button onclick = "window.scrollTo(0, 100000)"
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
async callAction(action: ACTION): Promise<RESPONSE>;
```

C'est dans ce service que vous devez coder votre file d'appel. Vous devez respecter la contrainte suivante : **vous ne pouvez pas appeler le serveur plus de `maxCall` fois sur une période de `timeRange` millisecondes** (respectivement définits à 5 et 1000).

Vous n'enfilerez pas les actions mais des `ActionCall`, qui sont paramétrés par les types A et T (dans votre cas `ACTION` et `RESPONSE`)

```typescript
interface ActionCall<A, T> {
  readonly resolve: (r: T) => void;
  readonly reject : (reason?: unknown) => void;
  readonly action: A;
}
```

### Indications

L'idée est de déclarer deux sujets sources :

* Un qui va publier les actions à effectuer (ou plutôt les `ActionCall`)
* Un qui va publier des void qui serviront de déclancheur pour effectuer les requêtes au serveur.

Bien entendu, il faut lier ces deux sujets sources de sorte qu'une requête ne soit émise que si le sujet déclancheur publie un void. Utilisez pour cela la fonction `zip` de RxJS (voir [la documentation](https://rxjs-dev.firebaseapp.com/api/index/function/zip)). Il faudra ensuite dériver cet observable pour faire les requêtes et renvoyer transmettre les réponses. Vous aurez besoin des opérateurs RxJS suivants : [`mergeMap`](https://rxjs.dev/api/operators/mergeMap), [`delay`](https://rxjs.dev/api/index/function/delay), [`tap`](https://rxjs.dev/api/index/function/tap). N'oubliez pas de rendre votre observable chaud (c'est plus sur).

## Résultat attendu

Voici ce que ça devrait donner, la barre verte représente le temps, la zone verte représente la période de `timeRange` millisecondes. Les requêtes sont représentés par les barres grise, le côté gauche de ces barres représente la date d'émission de la requête et le côté droit la date de réception de la réponse.

Dans votre version, vous verrez aussi des lignes rouges qui représentent les rejets de la requête par le serveur (trop de requêtes simultanées). La barre à gauche représente la date d'émission de la requête rejetée. En cas de requête rejettée, une erreur s'affiche aussi dans la console.

<iframe src="https://alexdmr.github.io/l3m-2023-2024-rxjs-fifo/"
        style="width: 100%; height: 200px; border: solid black 1px; border-radius: 0.5em; overflow: hidden;"
></iframe>

## N'oubliez pas de renseigner l'adresse du fork de votre projet StackBlitz ci-dessous
