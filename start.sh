docker-compose down
docker-compose build
docker rmi $(docker images -f "dangling=true" -q)
docker-compose up -d
