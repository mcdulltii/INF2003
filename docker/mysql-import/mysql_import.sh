#! /bin/bash

docker exec -i mariadb sh -c 'exec mariadb -uuser -ppassword mysql_db < /forums.csv'
docker exec -i mariadb sh -c 'exec mariadb -uuser -ppassword mysql_db < /posts.csv'
docker exec -i mariadb sh -c 'exec mariadb -uuser -ppassword mysql_db < /users.csv'
docker exec -i mariadb sh -c 'exec mariadb -uuser -ppassword mysql_db < /votes.csv'