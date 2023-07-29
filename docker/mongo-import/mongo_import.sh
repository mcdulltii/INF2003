#! /bin/bash

mongosh --host mongodb --port 27017 --authenticationDatabase admin --username root --password password < mongo-init.js

mongoimport --host mongodb --port 27017 --db mongo_db --collection posts --file Top_Posts_mongo.csv --type csv --headerline -u root -p password --authenticationDatabase admin
mongoimport --host mongodb --port 27017 --db mongo_db --collection comments --file Top_Posts_Comments.csv --type csv --headerline -u root -p password --authenticationDatabase admin
