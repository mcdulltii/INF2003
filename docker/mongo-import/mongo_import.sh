#! /bin/bash

mongoimport --host mongodb --db mongo_db --collection posts --file /mongo-import/Top_Posts_mongo.csv --type csv --headerline -u user -p password --authenticationDatabase mongo_db
mongoimport --host mongodb --db mongo_db --collection comments --file /mongo-import/Top_Posts_Comments.csv --type csv --headerline -u user -p password --authenticationDatabase mongo_db
