docker cp Top_Posts_mongo.csv mongodb:/Top_Posts_mongo.csv
docker cp Top_Posts_Comments.csv mongodb:/Top_Posts_Comments.csv

docker exec -it mongodb mongoimport --db mongo_db --collection posts --file /Top_Posts_mongo.csv --type csv --headerline -u user -p password --authenticationDatabase mongo_db
docker exec -it mongodb mongoimport --db mongo_db --collection comments --file /Top_Posts_Comments.csv --type csv --headerline -u user -p password --authenticationDatabase mongo_db