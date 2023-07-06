docker-compose down
DOCKER_BUILDKIT=1 docker-compose build
docker rmi $(docker images -f "dangling=true" -q)
docker-compose up -d
