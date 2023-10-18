# Un peu plus loin avec les observables chuauds et froids

Nous avons vu rapidement que les observables RxJS peuvent être froids ou chauds. Un observable « froid » est réinstancié à chaque fois qu'on s'y abonne, alors qu'un observable « chaud » ne sera instancié qu'une fois au maximum et émettra la même valeur à tous ses observateurs. Le problème, c'est que lorsqu'on dérive un observable chaud, on aboutit souvent à un observable froid et cela peut parfois causer des ennuis.

Reprenons l'exercice précédent du chronomètre avec les observables, lorsque vous avez dérivé l'`observable click` en un nouvel observable, ce nouvel observable était froid, ce qui signifie que à chaque abonnement, la chaine de transformation du pipe était répliquée. Cela n'a pas posé de problème car vous ne vous êtes abonné qu'une fois à ce nouvel observable (indirectement, c'est en fait la fonction `toSignal` qui a réalisé cet abonnement).

## Transformer un observable froid en observable chaud

Il est fort heureusement possible de produire un observable chaud à partir d'un observable froid. Nous allons détailler plusieurs techniques pour y parvenir.

### Cas d'un observable sans état

Dans le cas où vous voulez produire un observable chaud sans état, c'est-à-dire un observable qui ne garde pas de trace de son historique, qui ne publie pas automatiquement une valeur lorsqu'on s'y abonne, il suffit d'utiliser l'opérateur [**`share`**](https://rxjs.dev/api/operators/share) en bout de chaine :

```typescript
const obsY = obsX.pipe(
  map( ... ),
  filter( ... ),
  switchMap( ... ),
  // ... et autres opérateurs possibles,
  // on illustre simplment qu'on a une chaine
  // de transformation
  share()
);
```

Cela produit un observable chaud qui est instancié lors du premier abonnement et pas réinstancié lors des abonnements supplémentaire. L'observable est détruit si tous les abonnés se désabonnent.

### Cas d'un observable avec état : shareReplay

Dans le cas où vous voulez produire un observable chaud avec état, c'est-à-dire un observable qui garde la trace de son historique, qui publie automatiquement une valeur lorsqu'on s'y abonne, il faut utiliser l'opérateur [**`shareReplay`**](https://rxjs.dev/api/operators/shareReplay) en bout de chaine. Cet opérateur prend en paramètre le nombre de valeurs à rejouer lorsqu'un nouvel abonné s'abonne à l'observable. ***Attention !*** Si ce paramètre est omis, alors toutes les valeurs sont rejouées.

```typescript
const obsY = obsX.pipe(
  map( ... ),
  filter( ... ),
  switchMap( ... ),
  // ... et autres opérateurs possibles,
  // on illustre simplment qu'on a une chaine
  // de transformation
  shareReplay(1)
);
```

Ici, chaque nouvel abonné recevra la dernière valeur publiée par l'observable (si il y en a une). Si obsX est un observable avec état alors il y aura toujours une valeur à publier, sinon il n'y en aura pas forcément au début.

***Attention*** : Si tous les abbonées se désabonnent, alors l'observable est détruit, il n'est instancié qu'à chaque  premier abonnement (il peut être instancié, détruit, réinstancié, etc.).

### Cas d'un observable avec toujours un état : Abonnement à un BehaviorSubject

La technique précédente ne permet pas de s'assurer que l'observable a toujours un état à publier (ce peut être le cas mais pas forcément, cela dépendra si obs). On peut de plus vouloir viter de détuire l'observable si tout le monde s'en désabonne (si les valeurs produites sont par exemple très coûteuse à construire ou si il arrivera souvent qu'on s'y abonne et qu'on s'y désabonne).

Si vous souhaitez avoir cette propriété, on conseille de passer par un BehaviorSubject qui aura donc une valeur initiale et qui sera le seul à écouter votre observable (qui peut alors rester froid sans conséquence). On exposera ensuite le BehaviorSubject comme observable chaud avec état à l'aide de sa méthode `asObservable` (qui permet de l'exposer en tant qu'observable seimple, sans méthode `next`).

```typescript
private bsY = new BehaviorSubject<T>( valeurInitiale );
private sub = obsX.pipe(
  map( ... ),
  filter( ... ),
  switchMap( ... ),
  // ... et autres opérateurs possibles,
  // on illustre simplment qu'on a une chaine
  // de transformation
).subscribe(bsY);
public obsY = bsY.asObservable();
```
