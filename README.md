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
  1. **Minuteur côté serveur**:
  Le minuteur côté serveur est une fonctionnalité cruciale qui gère le compte à rebours pour chaque question du quiz, assurant ainsi que tous les participants disposent du même temps pour répondre. Cette composante nécessite une synchronisation précise entre le serveur et les clients pour maintenir l'intégrité du temps restant, indépendamment des latences réseau. La mise en place d'un tel système a demandé une compréhension approfondie des mécanismes de temporisation côté serveur et leur impact sur l'expérience utilisateur, garantissant une compétition équitable pour tous les participants.
  2. **Retour en direct sur les réponses**:
  Le retour en direct sur les réponses permet aux participants de recevoir une confirmation immédiate après avoir soumis leur réponse, enrichissant l'expérience interactive du quiz. Cette fonctionnalité implique une communication efficace entre le serveur et le client pour transmettre les feedbacks en temps réel, permettant ainsi aux joueurs de savoir instantanément s'ils ont correctement répondu à la question ou non. Développer ce système nécessite une attention particulière à la réactivité de l'interface utilisateur, assurant une expérience ludique et engageante.
  3. **Stockage de données persistant**:
  Le stockage de données persistant est essentiel pour sauvegarder les informations relatives aux quiz, aux participants et aux résultats, permettant une récupération et une analyse des données à long terme. Cette fonctionnalité garantit que les informations restent intactes même après un redémarrage du serveur, offrant ainsi une base solide pour la gestion des données du quiz. L'implémentation de cette solution a requis une expertise en bases de données et en systèmes de gestion de données persistantes, assurant la fiabilité et la sécurité des informations stockées.
- **Chemlal Morade (Pseudo GitHub: `mchemlal`)**
  1. **Déroulement des questions et réponses**:
  La notion CRUD questions et réponses a été gérée au niveau du serveur avec les services implementant la logique de récupération de données et avec l'appel de mes fonctions dans les controllers. A savoir que les réponse sont une table de jointure qui va récupérer la participation, la question et les options (différents choix de réponse). Ensuite au niveau front, il a fallu implementer les formulaires pour créer les questions et les ajouter à un quizz via un sélect. Au niveau des réponses, j'ai créé un composant molécule où je créé les résponses à ajouter en base et ensuite je récupère ces dernières au niveau du formulaire questions. Le défi a été tout autour de l'ajout des réponses pour chaque question. Le problème résidait dans la synchronisation de l'affichage des questions et réponses pour tous les participants en temps réel. La session.gateway est le point où l'ensemble des questions et réponses sont envoyées aux utilisateurs. La méthode launchQuizWorkflow parcourt les questions d'une session et les envoie via l'événement "question-sent". De même que la fonction "handleReceiverAnswer" qui récupère la réponse soumise ("answer-question"), la participation, la question et l'option choisi pour vérifier avec les données en base. Cette partie a été un vrai challenge de compréhension fonctionnelle du temps réel dans notre logique de quizz et de ce fait j'ai eu l'aide de la part de l'équipe afin d'arriver à l'objectif.
  2. **Notation et résultats**: 
  Pour ce qui est du score, la logique de CRUD base de données a été implémentée dans le serveur au niveau du service participation (champ score). Une phase de réflexion du processus de scoring pour intégrer les deux aspects, justesse et rapidité des réponses, etait nécessaire. Cette logique a été gérée au niveau du serveur via le fichier session.gateway. La méthode "handleReceiveAnswer" où nous récupérons la participation du client socket en cours. En fonction de si la réponse est correcte ou non, nous ajoutons le temps restant en secondes à une base de points de 10 et nous mettons en BDD la participation. La gestion des scores finaux est effectuée dans la méthode sendScoresToParticipants où on récupère toutes les participations et on les map pour binder les scores à l'événement "session-finish". Côté client, nous avons utilisé un écouteur d'événement "session-finish" dans lequel nous récupérons les données reçus de la socket et nous mettons à jour le state score dans le fichier session.index.tsx. Ici, j'ai eu des difficultés à transférer les données du back au front via la socket. Mais j'ai pu m'appuyer sur la logique déjà présente dans ce fichier pour faire la mienne.
  3. **Dockerisation**:
  On niveau du docker, nous avons choisi de faire qu'un docker compose file avec tous les services nécessaires à nos besoins. Nous avons utilisé NEST pour la partie back qui est lancé avec la commande npm run start:dev pour lancer en mode dev. Le volume local est bindé à /app de notre docker. Il sera lancé sur le port 3000. La partie données sera géré par Postgres via le port 5432. Je n'ai pas eu de grandes difficultés sur cet aspect. Je me suis inspiré d'autres projets où les dockercompose.yml étaient sensiblement les mêmes.

  Plus globalement, les défis de ce projet on été la gestion du temps réel au niveau front et back. Plus précisément comment transférer et récupérer la donnée en fonction de notre logique métier. A cela, j'ai aussi été confronté au besoin de monté en compétence sur Next et Nest sachant que je ne suis pas un grand passionné de l'univers javascript.
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


