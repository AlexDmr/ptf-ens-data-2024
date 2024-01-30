# Réduction des possibilités de types par utilisation de fonctions

Lorsque vous utilisez des unions de types, ou plus généralement lorsque vous voulez restreindre le typage d'une variable à un type plus restreint, vous pouvez utiliser des fonctions pour réduire les possibilités de types. Il existe une syntaxe particulière pour cela.

Illustrons ceci avec l'exemple ci-dessous. La fonction `isDice` a une syntaxe un peu particulière : elle renvoie un booléen qui permet d'affirmer ou d'infirmer que `d` est un DICE, notons le type de retour ```v is DICE```. Ce type de retour est appelé un **type de garde**. Il permet de restreindre le type d'une variable à un type plus spécifique. Dans notre exemple, la variable `d` est de type `number`, mais grâce à la fonction `isDice`, le compilateur va restreindre le type de `d` à `DICE` si et seulement si la fonction renvoie true.

Vous pouvez retrouver cet exemple en ligne sur [un Typescript Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAIgkgYQKJQLxQIxQD5QEw5QDMhALIQKyEBsA3AFD0BmArgHYDGwAlgPZtRuAZxjcOEABQA3AFxQ2LALYAjCACcAlHKmChsRCgDe9KKahqIwFmoEA5JarUA6YXDbAIAc3XSNUAGT+UDoAfOhYgcFQADyodPQAvoysnDz8UAAmvADKvIqWABbcbJ4A6tzABaLiEhlyCirqWsG83BlQxmZQADaWmWIQcvDIDCZmAPTjUAAy0Bx5YNzdAIYe1lAAl-nAUOzQ6hbrHMtquwINjvIA5BBCO2DLeky8ahxbEO5n+shjphkDaEyoy63CYUAkAEJhNVJBkNH5Ol0JlNZlB5opFis1qd3js9lADhAjidBN0CXc0epgMtilAAI4saDtNg3CkPPTsb5IX5I-7iQEZBhIsyVNS8ADu8ggkqQajFagkACIpMtuoyoEICrwWN12qooMsuYqNEKzEkeZMZnMFktVkTTssOBwABdgDyU4Du5ZMJgQLirPgCC1TY6nJYG8y3YAWYo7XpQUCQTJMqCeNQAI-5AAOeobnqlA7oYTy+dB0ILEkA).

```typescript
type DICE = 1 | 2 | 3 | 4 | 5 | 6;

function isDice(v: number): v is DICE {
    return Number.isInteger(v) && v >= 1 && v <=6;
}

function doSomethingWithDice(d: number): void {
    let dice: DICE;

    // Le compilateur émet une erreur car un number n'est pas forcément un DICE
    dice = d;

    if (!isDice(d)) {
        // Le compilateur émet une erreur car il est certain que d n'est pas un DICE
        dice = d;
        throw new Error("value should be a DICE");
    }

    // Le compilateur accèpte cette affectation 
    // car il a restreint le type de d grâce à la fonction isDice
    dice = d;
}
```
