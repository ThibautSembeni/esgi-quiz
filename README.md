# ESGI quiz

Ce projet contient un fichier docker-compose.yml qui est configuré pour démarrer un service server utilisant Nest.js en mode développement, ainsi qu'une base de données PostgreSQL.
Nous avons réalisé ce projet en pair programming, en utilisant la méthode de développement agile Scrum.

## Workflow du projet

**En tant que manager**

1. **Inscription sur la plateforme Chaos**
   - Créez un compte sur la plateforme Chaos.
   - Remplissez les informations nécessaires, telles que votre nom d'utilisateur et votre mot de passe.

2. **Création d'un quiz**
   - Accédez à l'onglet "Quiz".
   - Cliquez sur le bouton "Créer un quiz".
   - Saisissez le nom du quiz.

3. **Création des questions**
   - Dans l'onglet "Questions", cliquez sur le bouton "Ajouter une question".
   - Saisissez la question et les réponses possibles.
   - Indiquez la bonne réponse.

4. **Création d'une session**
   - Dans l'onglet "Sessions", cliquez sur le bouton "Créer une session".
   - Sélectionnez le quiz que vous souhaitez utiliser.
   - Cliquez sur le bouton "Créer".

5. **Diffusion du code de la session aux participants**
   - Le code de la session est généré automatiquement.
   - Communiquez le code aux participants pour qu'ils puissent rejoindre la session.

6. **Déroulement de la session**
   - Les participants vont sur la plateforme Chaos et saisissent le code de la session.
   - Ils renseignent leur nom d'utilisateur.
   - Ils répondent aux questions du quiz dans le temps imparti.
   - A la fin du quiz, les participants reçoivent leur score.

7. **Analyse des résultats**
   - Le manager peut consulter les résultats de la session en temps réel pendant le quiz.
   - Il peut visualiser les scores des participants, les questions auxquelles ils ont répondu correctement et incorrectement.

# Prérequis
Assurez-vous d'avoir Docker, Docker Compose et Node.js installés sur votre machine.

# Instructions (Server (API))

1. Pour que votre serveur puisse démarrer correctement, vous devez copier le fichier `server/.env.sample` et le renommer en `server/.env.local`. Ensuite, vous devez modifier les valeurs dedans.


1. Lancez le service server et la base de données en utilisant Docker Compose.

    ```bash
    docker-compose up
    ```

Cela lancera l'application Nest.js en mode développement et configurera la base de données PostgreSQL.
 
2. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

3. Pour arrêter les services, utilisez la commande suivante dans le répertoire du projet.

    ```bash
    docker-compose down
    ```

# Client

Pour démarrer le client, vous devez d'abord vous assurer que vous êtes dans le bon répertoire et que toutes les dépendances sont installées. Voici comment vous pouvez le faire :

1. Ouvrez un terminal.
2. Naviguez vers le répertoire `client` en utilisant la commande :
```bash
cd client
```
3. Installez les dépendances en utilisant la commande :
```bash
npm install
```

Une fois que vous avez installé les dépendances, vous pouvez utiliser les commandes suivantes pour interagir avec le client :

- Pour que votre client puisse accéder à l'API, vous devez copier le fichier `client/.env.sample` et le renommer en `client/.env.local`. Ensuite, vous devez modifier la valeur de `NEXT_PUBLIC_API_URL` pour qu'elle corresponde à l'adresse de votre API. Par exemple, si vous utilisez Docker Compose, vous pouvez définir la valeur sur `http://localhost:3000`.

- Pour démarrer le client en mode développement, utilisez la commande suivante :
```bash
npm run dev
```
- Pour construire le client pour la production, utilisez la commande suivante :
```bash
npm run build
```
- Pour démarrer le client en mode production, utilisez la commande suivante :
```bash
npm start
```


# Bonus Optionnels

## Fonctionnalités bonus optionnels

**Stockage de données persistant avec PostgreSQL et Docker**

J'ai implémenté un système de stockage de données persistant en utilisant PostgreSQL comme base de données et Docker pour la gestion des conteneurs. Cela permet de stocker les données de manière durable et sécurisée, même en cas de redémarrage du serveur ou de panne matérielle.

**Gestion de l'authentification avec Passport.js**

J'ai intégré le package Passport.js dans Nest.js pour gérer l'authentification côté API. Cela permet de sécuriser l'accès à l'application et de garantir que seuls les utilisateurs autorisés peuvent y accéder.

**Fonctionnalité de gestion des salles**

J'ai développé une fonctionnalité de gestion des salles qui permet aux utilisateurs de créer et de rejoindre des salles pour jouer au quiz ensemble. Les données de la salle, telles que les questions, les réponses et les scores, sont stockées dans la base de données.

**Tableau de classement en temps réel**

Le manager de la session peut visualiser un tableau de classement en temps réel qui affiche les scores des utilisateurs à chaque question. Cela permet de suivre la progression des joueurs et d'ajouter un élément de compétition au quiz.

**Fonctionnement du tableau de classement**

Le manager de la session reçoit les questions et la liste des utilisateurs au début du quiz. Ensuite, à chaque fois qu'un utilisateur valide une réponse, le manager reçoit une mise à jour avec les nouvelles informations. Le tableau de classement est ensuite mis à jour en temps réel pour refléter les nouveaux scores.

## Contributions de l'équipe

- **Romain Lethumier (Pseudo GitHub: `romain0201`)**
- **Chemlal Morade (Pseudo GitHub: `mchemlal`)**
- **Samy Amallah (Pseudo GitHub: `Choetsu`)**
  1. Interface de création de quiz
  L'interface de création de quiz est une fonctionnalité clé qui permet au manager de concevoir et de personnaliser des quiz selon ses besoins. Cette interface est intuitive et facile à utiliser, permettant la création de multiples quiz avec la possibilité d'ajouter, de modifier ou de supprimer des questions pour chaque quiz. La conception de cette interface a nécessité une réflexion approfondie sur l'expérience utilisateur pour garantir que le processus de création de quiz soit à la fois fluide et efficace, permettant aux managers de préparer leurs sessions de quiz sans difficulté.
  2. Communication en temps réel avec Socket.IO
  L'utilisation de Socket.IO pour la communication en temps réel est central pour la partie interactive du quiz. Cette technologie permet de maintenir une connexion bidirectionnelle et en temps réel entre le serveur (back-end Nest) et le client (front-end Next), ce qui est essentiel pour synchroniser l'état du quiz entre tous les participants et le manager. La mise en place de cette communication en temps réel a demandé une compréhension approfondie des WebSockets et de leurs interactions avec la stack technologique choisie. Grâce à Socket.IO, les participants peuvent voir les questions et soumettre leurs réponses en temps réel, tandis que le manager peut lancer des quiz et surveiller l'avancement des participants instantanément.
  3. Notifications en temps réel
  Les notifications en temps réel ajoutent de la dynamique au sein du quiz en informant les participants et le manager d'événements importants pendant la session de quiz. Par exemple, les participants peuvent recevoir des notifications lors du lancement d'un quiz, de la publication de nouvelles questions, ou à la fin du quiz, tandis que le manager peut être alerté de l'ajout de nouveaux participants ou de la soumission de réponses. Le développement de ce système de notifications nécessite une attention particulière aux détails et à l'expérience utilisateur pour s'assurer que les informations pertinentes sont communiquées efficacement sans surcharger les utilisateurs.
- **Thibaut Sembeni (Pseudo GitHub: `ThibautSembeni`)**
  1. Fonctionnalité de la salle de quiz
  * **Création et gestion de salles** : Les utilisateurs peuvent créer et rejoindre des salles pour jouer au quiz ensemble via un code unique.
  * **Stockage des données** : Les données de la salle, telles que les questions, les réponses et les scores, sont stockées dans la base de données.
  * **Authentification des utilisateurs** : Le système d'authentification intégré garantit que seuls les utilisateurs autorisés peuvent manger les salles.
  2. Gestion avancée des salles
  * **Différents types de questions** : Le système prend en charge plusieurs types de questions, tels que les QCM, les réponses courtes et les questions à choix multiples.
  * **Limite de temps** : Les utilisateurs peuvent avoir un temps limité pour répondre aux questions.
  * **Système de points** : Les utilisateurs reçoivent des points en fonction de leurs réponses correctes.
  3. Tableau de classement en temps réel
  * **Affichage des scores** : Le tableau de classement affiche les scores des utilisateurs en temps réel.
  * **Motivation des participants** : Le tableau de classement encourage les participants à faire de leur mieux.
   ### Post-scriptum
  Lors d'un précédent cours, vous aviez proposé d'accorder deux points supplémentaires sur le CC aux étudiants qui réussiraient à implémenter la communication webRTC. J'ai réussi à implémenter cette fonctionnalité juste avant la fin du cours. Je vous aviez montré. Si cette proposition est toujours d'actualité, je serais reconnaissant de recevoir ces deux points supplémentaires. (Thibaut Sembeni)


