## Livrable 3

* ~~Afficher la page d’une série télévisée~~
        
    * ~~La page permet d'ouvrir une fenêtre modale pour chaque épisode de la série. La fenêtre modale doit comprendre les détails suivants :~~
        
        * ~~nom de la saison~~
        
        * ~~nom de l'épisode~~
        
        * ~~couverture~~
        
        * ~~preview vidéo de l'épisode~~
        
        * ~~description~~
        
        * ~~durée de l'épisode~~
    
  * ~~La page doit permettre de chercher parmi les épisodes de la série.~~

* ~~Afficher la page d’enregistrement (*sign up*)~~

    * ~~L’utilisateur doit pouvoir s’enregistrer en entrant son nom, courriel, et mot de passe~~

* ~~Afficher la page d’authentification (*login*)~~

    * ~~L’utilisateur doit pouvoir se connecter avec son courriel et mot de passe~~

    * ~~L’application doit enregistrer le token d’authentification dans un cookie et envoyer ce token comme en-tête Authorization à chaques requêtes AJAX~~

        * ~~Un fois le token enregistré, on peut fermer le navigateur et retourner sans avoir à entrer son mot de passe~~

    * ~~L’application doit rediriger l’utilisateur à la page de login si son token est expiré, ou absent.~~

    * ~~Afficher un message d’erreur clair en cas de mauvaise combinaison courriel et mot de passe~~

* Permettre la recherche

    * Recherche globale

    * Recherche par

        * Film

        * Saison de série télévisée

        * Acteur

        * Utilisateur

    * La recherche doit mener à une page de résultat

* Page de résultats (recherche globale)

    * Afficher un icône pour différencier les résultats (film, saison de série télévisée, acteur, utilisateur) **OU** grouper les résulats par type

    * Les résultats doivent avoir des boutons pour ajouter à une watchlist dans le cas d'un film ou, dans le cas d’un utilisateur, un bouton pour suivre celui-ci.

    * Lien vers le résultat plus en détails (page série, page film, page acteur, page utilisateur)
    
    * La page doit permettre de filtrer par genre. Elle doit donc lister les genres et lorsque l'usager clique sur un ou plusieurs genres, afficher seulement les films/séries correspondant à ces genres.

* Afficher la page d’un utilisateur

    * Sois l’utilisateur courant ou un utilisateur d’un résultat de recherche

    * Afficher le nom et le courriel de l’utilisateur

    * Afficher une liste des watchlists de cet utilisateur

    * Offrir un bouton suivre et arrêter de suivre pour ajouter ou supprimer cet utilisateur de votre liste d’amis.

    * Afficher les amis de l’utilisiteur

* Validation et sécurité

    * L’application doit afficher des messages d’erreurs clairs lorsqu’un erreur serveur survient.

    * Tous les formulaires doivent être validés via JavaScript **avant** d’être soumis au serveur

* Fonctionnalités avancées (**choisir 2 parmis les propositions suivantes**)

    * La barre de recherche offre l’autocomplétion des résultats pendant que l’utilisateur tappe au clavier

    * Afficher une photo de l’utilisateur avec gravatar
    
    * Permettre de "reviewer" un film/série et d'afficher les reviews des différents utilisateurs.

    * Obtenir des suggestions d’acteurs similaires à un acteurs ou de films similaires à un film

    * La page de film/série permet de trouver le film/série à meilleur prix sur des sites d’achat en ligne (Amazon, Archambault, iTunes, etc)

    * Une fonctionnalité de votre choix

        * Cette fonctionalité doit être approuvée par les 2 enseignants du cours

* Document design

    * Expliquer comment lancer l’application

    * Donner des détails sur comment voir chacune des pages

        * urls

        * boutons à cliquer

        * facilitez la vie du correcteur !

    * Expliquer vos 2 fonctionnalités avancées et comment les voir en action

