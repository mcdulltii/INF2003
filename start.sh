docker-compose down
DOCKER_BUILDKIT=1 docker-compose --profile all up -d --build
docker rmi $(docker images -f "dangling=true" -q)
