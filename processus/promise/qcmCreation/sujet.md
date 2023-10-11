# QCM création de promesses

Supposons que vous disposiez d'une fonction **f** qui va générer une image. `**`f`**` est asynchrone, elle renvoie **`void`** mais prend en paramètre une callback qui sera appelée lorsque l'image aura été générée. On suppose que **`f`** n'échoue jamais (pas d'exception, pas d'erreur). Cette callback sera appelée avec l'image en paramètre.

Exemple d'utilisation :

```typescript
const cb = img => {... on va faire quelque chose avec l'image img, par exemple l'afficher...}

f( cb )
```

On voudrait produire une fonction **`fp`** qui encapsule l'appel à **`f`**, ne prend pas de paramètre et renvoie la promesse d'une image produite par **`f`**.

Cochez les façons correctes de définir **`fp`**.
