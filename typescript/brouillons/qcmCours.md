# QCM cours `Typescript`

QCM à faire faire aux étudiants pendant le cours de `Typescript`.
Prévoir deux modes :

1) Mode piloté par le professeur : le professeur pose les questions et les étudiants répondent.
2) Mode auto-évaluation : les étudiants répondent aux questions seuls, ils peuvent rejouer le QCM autant de fois qu'ils le souhaitent.

## Fonction 1, typage

Soit la fonction suivante :

```typescript
function createAdder(n: number): (x: number) => number {
    return (x: number) => n + x;
}
```

Quel est son type de retour ?

1) `number`
2) `(x: number) => number`
3) `(n: number): (x: number) => number`
4) `any`

Discussion ?
1 est ce qui est renvoyé par la fonction retournée par `createAdder`.
2 est le type de la fonction retournée par `createAdder`.
3 n'est pas un type.
4 est un type mais il est trop général par rapport à ce que fait la fonction.

## Fonction 2, clôture

Quel est la définition `Typescript` correspondant à une fonction `getFctMessage` telle que cette dernière :

* prend en paramètre une chaîne de caractère `str`
* renvoie une fonction qui ne prend pas de paramètre et qui renvoie `str`.

```typescript
function getFctMessage(str: string) {return str}
```

```typescript
function getFctMessage() {return str}
```

```typescript
function getFctMessage(str: string) {return () => str}
```

```typescript
function getFctMessage(f: (str: string) => string) {return f(str)}
```

Discussion ?
XXX

## Objets, compatibilité de type

    • Généricité, function
    • Généricité, objets
    • Nullish coalescing
    • Chainage optionnel
    • Union de type
    • Types littéraux
    • Tuples, tuples et paramètres de fonction, déstructuration
    • Fonctions d'ordre supérieur +++
        ○ map
        ○ filter
        reduce

## Discussion à la fin

En discussion sur le typage avancé, on code 

```typescript
type PARAM<F extends (infer P) => unknown> = P
```
