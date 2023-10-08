# Mécanisme d'injection de dépendance

Angular permet de lier les composants (leur VueModèle) à des services grâce à un mécanisme appelé ***« injection de dépendance »***. Pour savoir qu'il faut lier un service à un composant, il faut que le composant définisse un paramètre du type du service dans son constructeur. Ainsi, lorsque Angular voudra instancier un composant de ce type (lorsqu'il « verra »  la balise correspondant à ce type de composant), il devra passer en paramètre du constructeur une instance du service.

C'est à ce moment-là qu'intervient le mécanisme d'injection de dépendance. Si une instance du service existe déjà, on la passe en référence au constructeur du composant. Sinon, l'injecteur de dépendance en fabrique une et la passe en référence au constructeur du composant.

Pour savoir si une instance de service est disponible, Angular applique la stratégie suivante. Il commence par voir si le composant lui-même peut fournir le service.  Si c'est le cas, il lui demande de fournir le service en question. Si le composant lui-même ne fournit pas le service demandé, alors Angular le demandera récursivement à chaque composant parent. Si aucun d'eux ne le fournit, Angular demandera au module Angular dans lequel le composant est défini, au module qui l'encapsule, etc. jusqu'à atteindre la racine du projet. Si personne ne fournit le service, alors Angular lèvera une erreur (le composant ne pourra pas être instancié).

Par défaut, losqu'on génère un service avec la CLI Angular, celui-ci est instancié au niveau de la racine du projet. Cela signifie que tous les composants peuvent y accéder. Si on veut que le service soit instancié au niveau d'un module, il faut le déclarer dans le tableau `providers` du module en question. De même, si on veut qu'il soit instancié au niveau d'un composant, il faut le déclarer dans le tableau `providers` du composant en question.

```typescript
@Component({
  selector: 'app-couleur-slide',
  templateUrl: './couleur-slide.component.html',
  styleUrls: ['./couleur-slide.component.css'],
  providers: [CouleurService]
})
class ...
```
