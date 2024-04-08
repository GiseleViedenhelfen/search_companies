#!/bin/bash
cd api/
go mod tidy
echo "Starting MySQL database container..."

source ".env"
if docker ps -a --format '{{.Names}}' | grep -q "api_database"; then
    if docker inspect -f '{{.State.Running}}' "api_database" 2>/dev/null | grep -q "true"; then
        echo "Container 'api_database' is already running."
    else
        echo "Starting container 'api_database'..."
        docker start "api_database"
        while ! docker exec api_database mysqladmin ping -h"172.17.0.2" -P"3307" --silent; do
            sleep 1
        done
        echo "Container 'api_database' started."
    fi
else
    echo "Starting a new container 'api_database'..."
    docker run --name api_database -e MYSQL_USER=${DB_USER} -e MYSQL_PASSWORD=${DB_PASSWORD} -e MYSQL_ROOT_PASSWORD=${DB_ROOTPASS} -e MYSQL_DATABASE=${DBNAME} -p ${DB_PORT}:3307 -d mysql --port=${DB_PORT}
    while ! docker exec api_database mysqladmin ping -h"172.17.0.2" -P"3307" --silent; do
        sleep 1
    done
    echo "New container 'api_database' started."
fi
echo "Running Go application..."
go run cmd/main.go
# exec air -c air.toml