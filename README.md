# ESGI quiz

Ce projet contient un fichier docker-compose.yml qui est configuré pour démarrer un service server utilisant Nest.js en mode développement, ainsi qu'une base de données PostgreSQL.

## Prérequis
Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.

## Instructions

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

C'est tout! Vous avez maintenant le service server Nest.js et la base de données PostgreSQL prêts à être utilisés en mode développement.
