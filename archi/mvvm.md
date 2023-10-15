# MVVM dans Angular

Les composants Angular sont construits sur le principe d'une architecture MVVM (Modèle-Vue-VueModèle) qui est une architecture dérivée de MVP. Le schéma suivant illustre cette architecture. Notez qu'elle est vraiment très proche de MVP, la seule différence réside dans le lien liant la vue au présentateur (nommée « VueModèle »). Ce lien s'appuie sur un mécanisme appelé « data-binding » . 

<div style="text-align:center">
    <img src   = "local://assets/archi/schema_VI-2_vue_g.png"
         alt   = "Schéma d'un système interactif"
         style = "max-width: min(100%, 714px);"
         />
</div>

Le mécanisme de data-binding permet de lier automatiquement des variables et expressions Typescript (ou Javascript) et des fragments de HTML. Cela évite l'écriture de code fastidieux (dont vous avez eu un aperçu dans la partie relative à MVP) : référencer les balises, s'y abonner explicitement, retranscrire des expressions dans les balises, etc.

Le modèle MVVM n'a pas été inventé avec Angular. Il date de 2005 et fut développé par Microsoft pour faciliter le développement de composants basés sur le langage de description d'interface humain-ordinateur XAML.

## Lien entre composants Angular et architecture MVVM

Les composants Angular respectent l'architecture MVVM mais les nommages ne sont pas exactement les mêmes. Dans Angular, un composant est défini par les seules parties Vue et VueModèle de MVVM. La partie Modèle de MVVM est nommée « service », tout comme dans MVVM et MVP, une VueModèle peut être liée à plusieurs services.

<div style="text-align:center">
    <img src   = "local://assets/archi/schema_VI.3.1_Plan_de_travail_1.png"
         alt   = "Schéma d'un système interactif"
         style = "max-width: min(100%, 797px);"
         />
</div>

Les composants Angular sont instanciés lorsqu'une balise les décrivant apparait dans une vue. Lors de l'instanciation, Angular instancie la classe VueModèle et le fragment HTML décrivant la vue. Il lie ensuite les deux parties en utilisant le mécanisme de data-binding.
