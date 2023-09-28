# Références dans la Vue

Il est possible de spécifier des références à des balises dans la ***Vue***. Cela se fait en ajoutant un attribut préfixé par le caractère **#** dans la balise correspondante. Le nom correspond alors à une variable interne à la vue qui désigne la balise et est utilisable comme telle.

Dans l'exemple suivant, la balise input contient un attribut **#lab**, cela revient à déclarer dans la vue une variable lab qui est utilisable là où la balise input est définie. Ainsi, il est possible de demander la valeur contenue dans la balise input dans l'abonnement à la soumission du formulaire (***lab.value***) puisque ***value*** est bien un attribut des balises input (Reqmaruqe, on ajoute un attribut name simplement pour être conforme aux spécifications HTML, la valeur de cet attribut peut être quelconque dans le cas présent).

```html
<form (submit) = "F(lab.value)">
  <input #lab name="lab" />
</form>
```

Il arrive parfois qu'on soit obligé d'avoir la référence à une balise de la ***Vue*** dans la ***vue-modèle***. Cela peut se faire, si la balise est référencée comme précédemment. Pour établir le lien, Angular propose entre autres le décorateur ***@ViewChild*** qui prend en paramètre le nom de la référence dans la vue et s'applique sur un attribut de la VueModèle.  L'attribut doit alors être de type ElementRef, qui est un type générique paramétré par le type de l'élément référencé (ici, un HTMLInputElement). Un ***ElementRef*** contient un attribut nativeElement qui référence la balise du DOM. Dans notre exemple, l'attribut lab est utilisé ensuite dans la méthode M pour donner le focus à la balise input.

```typescript
export class AppComponent  {
  @ViewChild("lab") lab: ElementRef<HTMLInputElement>;

  M(): void {
    this.lab.nativeElement.value.focus();
  }
}
```
