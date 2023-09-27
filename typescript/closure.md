# LA NOTION DE CLOSURE

En Typescript, comme en Javascript, il existe le mécanisme de closure d'une fonction. Ce mécanisme permet à une fonction de se référer à des variables ou constantes existants dans l'espace lexicale où la fonction est définie. Concrètement, cela signifie que lorsque vous définissez une fonction, celle-ci peut utiliser des variables ou constantes accessibles à l'endroit de la définition de la fonction, on dit que les variables ont une portée lexicale. Les fonctions imbriquées ont ainsi accès aux variables déclarées dans les portées parentes. Cette propriété n'est pas propre à Javascript, elle est courante dans les langages fonctionnels, mais pas dans les langages type Java ou C++ (du moins cela a été le cas avant l'introduction des lambda, mais la closure est limitée à ces dernières).

Nous verrons que ce mécanisme est particulièrement utile lorsqu'on code des interactions. L'exemple suivant illustre le principe de closure. La fonction createAdder prend un nombre **n** en paramètre et renvoie une autre fonction (qui prend en paramètre un nombre et renvoie un nombre). On fait appel à createAdder deux fois (avec les paramètres 3 et 5), on utilise ensuite les fonctions renvoyées pour afficher des résultats dans la console. 

Les fonctions crée par createAdder ont une closure. En effet, ces fonctions renvoie la sommes de **NB**, **n** et **x**. Or, si x est le paramètre de la fonction renvoyée, **n** est quant à lui le paramètre de la fonction createAdder et **NB** une constante définit dans createAdder. Il est possible de lier **NB** et **n** à la fonction renvoyée grâce au mécanisme de closure (ça ne serait pas possible en Java ou en C++, par exemple). Notez qu'ici la fonction est définie à l'aide de la notation fléchée, mais cela fonctionne tout aussi bien avec l'instruction **function**.

À titre d'exercice, essayez de définir la fonction getFctMessage telle que spécifiée lignes 13 à 19 dans [ce stackblitz](https://stackblitz.com/edit/theme-ihm-closure).

<iframe src="https://stackblitz.com/edit/theme-ihm-closure" style="width: 100%; height: 600px"></iframe>
