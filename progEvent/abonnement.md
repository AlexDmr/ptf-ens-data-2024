# Abonnement via les attributs onXXX
Afin de s'abonner à un événement EVT qui surviendrait dans un nœud N, il est possible d'utiliser l'attribut onEVT. Par exemple, pour s'abonner à l'événement **« click »** qui surviendrait sur le corps du document HTML (**document.body**), on peut affecter l'attribut **onclick** de l'objet **document.body**. En supposant qu'on veut ici afficher l'événement dans la console, on aurait alors l'instruction suivante :
```typescript
document.body.onclick = console.log;
```

Les éléments HTML possèdent de nombreux attributs, tel que onclick (voir la page MDN pour une liste plus exhaustive). Ces attributs sont de types **(evt?: Event) => any** .

Autre exemple, en supposant que p référence un paragraphe, on peut s'abonner au fait que le pointeur de la souris entre dans la zone graphique où le paragraphe est rendu, par exemple. Supposons qu'on veut, ici, afficher dans la console le texte "On entre dans le paragraphe...". Cela peut se faire avec l'instruction suivante :
```typescript
p.onmouseenter = () => console.log("On entre dans le paragraphe...");
```

L'attribut onmouseenter est ici affecté à la fonction définie avec la notation fléchée : 
```typescript
 () => console.log("On entre dans le paragraphe...")
```

Enfin, il est possible de se désabonner en réaffectant l'attribut onXXX à la valeur null, par exemple :
```typescript
p.onmouseenter = null;
```