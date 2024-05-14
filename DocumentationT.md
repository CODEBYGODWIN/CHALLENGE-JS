# Documentation Technique du Projet "Mes Comptes"(Application de gestion de budget)

## Introduction
Ce projet "Mes Comptes" est une application web permettant à l'utilisateur de gérer ses finances personnelles en enregistrant ses revenus et ses dépenses. L'application offre également des fonctionnalités d'inscription, de connexion, et de déconnexion pour les utilisateurs. 

## Fonctionnalités Principales
1. **Inscription et Connexion :** Les utilisateurs peuvent s'inscrire en fournissant un nom d'utilisateur, leur nom, leur adresse e-mail et leur mot de passe. Une fois inscrits, ils peuvent se connecter à leur compte à l'aide de leur adresse e-mail et de leur mot de passe.
2. **Gestion des Finances :** Une fois connectés, les utilisateurs peuvent ajouter des revenus ou des dépenses en fournissant une description, un montant, une date, une catégorie et éventuellement une sous-catégorie pour chaque transaction.
3. **Affichage des Données Financières :** L'application affiche les montants totaux des revenus, des dépenses et de l'argent disponible, ainsi que les transactions enregistrées pour chaque catégorie.
4. **Graphiques :** Un graphique est affiché pour visualiser les tendances des revenus et des dépenses au fil du temps.

## Structure du Projet
Le projet est structuré en différentes parties :

- **Serveur Backend :** Gère la persistance des données et les requêtes des clients.
- **Frontend :** Interface utilisateur (UI) où les utilisateurs interagissent avec l'application.
- **Base de Données :** Stocke les informations des utilisateurs et leurs transactions financières.
- **Localstorage :** Stocke les transactions financières des utilisateurs.

## Technologies Utilisées
- **Backend :** Node.js avec Express.js pour le serveur web et la gestion des routes.
- **Base de Données :** SQLite pour la persistance des données des informations de connexion utilisateurs et localstorage pour la persistance de leur finances.
- **Frontend :** HTML, CSS, JavaScript (Vanilla JS), avec l'utilisation de bibliothèques telles que Chart.js pour les graphiques.

## Architecture du Code
- **Backend :** Le code du serveur est organisé en différentes routes pour gérer les requêtes HTTP (inscription, connexion), avec une connexion à la base de données SQLite pour stocker et récupérer les données utilisateur.
- **Frontend :** Le code frontend est divisé en plusieurs fichiers JavaScript pour la logique métier (ajout de transactions, mise à jour des totaux, etc.) et pour la manipulation du DOM (mise à jour de l'interface utilisateur, gestion des événements, etc.).

## Installation et Exécution
1. Cloner le dépôt Git du projet.
2. Supprimer les fichiers package.json, package-lock.json et tout le dossier node_modules.
2. initialiser un nouveau projet Node.js avec `npm init -y`
3. Installer les dépendances avec `npm install` (principalement `npm install express` et `npm install sqlite3`).
4. Lancer le serveur avec `node server.js`.
5. Accéder à l'application via un navigateur web à l'adresse `http://localhost:3000`.
