# I was here

EVO Python Lab 2022 Task 2
Web service

The visitor can leave their name in the form on the main page. After that, the name will be written to the database on the server and to the local storage of the web browser. At the next visit of main page, the user will see his name.

## Stack

- flask web framework
- redis/mongo databases
- docker/docker-compose
- nginx
- heroku deploy
- html, tailwind css, clean js

## All internet users

The simplest and fastest solution to process and store name data is key-value database.
Redis is one of the best solutions. But there are problems with saving data if server failure and the complexity/expensive in providing the necessary resources(RAM...).
MongoDB base can also be used as kind of key-value datastore...
To reduce server load- names store on the client side.


## Two solutions

1. Docker-compose, mongodb - the cheapest way.

   The solution to start web-service on the dedicated server with own mongodb.
   
   `app.py`

2. Heroku, redis.

   The solution to fast and free deploy demonstratic version to heroku with redis db. For production needs to pay for resources
   
   `app-redis.py`

## Automatic deploys
Automatic deploys connected throw the heroku without gh actions workflows and tests.
For docker-compose solution, we can use Dokku with gh actions...
