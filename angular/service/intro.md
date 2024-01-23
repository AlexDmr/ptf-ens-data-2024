# Qu'est ce qu'un service ?

Dans Angular, un service est simplement définit par une classe Typescript. On précise ensuite qui peut instancier cette classe (un module Angular, un composant, etc.). Par défaut quand on le crée, chaque service déclaré dans Angular est instanciable au niveau de la racine de l'application.

Un service est donc déclaré dans un certain contexte (l'application, un module, un composant). Angular va s'assurer que chaque composant de ce même contexte aura accès à la même instance du service. On dit que cette instance est un ***singleton*** (dans le cadre du contexte où il est définit). Cela signifie que si un composant modifie une propriété du service, alors tous les autres composants verront cette modification.

Notons qu'il est possible d'avoir plusieurs instances d'un même service, associées à des contextes différents (ex: une pour l'application, une pour un module, une autre pour un composant). Angular fournira la bonne instance en fonction du contexte.

## Quand utiliser un service ?

Un service dans Angular va servir à encapsuler de la logique métier. Il va permettre de séparer la logique métier de la logique de présentation. On définit donc un service à chaque fois qu'on veut intéragir avec une source de données particulière (un serveur, le localStorage, une API Web, etc.). Le service va encapsuler la logique d'intéraction avec cette source de données.

* Il va exposer les données sous forme de signal ou d'observable RxJS.
* Il va exposer des méthodes permettant de modifier ces données.

Il est aussi parfois utile de définir des services pour communiquer plus facilement de l'information ente composants. Nous ne détaillerons pas cette usage dans ce cours (mais il existe et peut être utile dans certains cas).

## Comment définir un service ?

Pour définir un service, on utilise la commande :

```bash
npx ng generate service <nom-du-service>
```

Cela va créer un fichier `<nom-du-service>.service.ts` dans le dossier `src/app`. Ce fichier contiendra la classe du service. Il est possible de paramétrer cette commande pour spécifier par exemple à quel contexte associer le service (module, composant, etc.) mais nous n'utiliseront pas cela pour le moment.
