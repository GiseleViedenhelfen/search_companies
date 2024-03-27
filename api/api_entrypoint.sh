#!/bin/bash
cd api/
go mod tidy
if docker ps | grep -q "scraping_database"; then
    echo "Container 'scraping_database' is already running."
else
echo "Starting MySQL database container..."
source "$(dirname "$0")/.env"
docker run --name scraping_database -e MYSQL_USER=${DB_USER} -e MYSQL_PASSWORD=${DB_PASSWORD} -e MYSQL_ROOT_PASSWORD=${DB_ROOTPASS} -e MYSQL_DATABASE=${DBNAME}  -p ${DB_PORT}:3307 -d mysql --port=${DB_PORT}
# Run Go application
while ! docker exec scraping_database mysqladmin ping -h"172.17.0.2"  -P"3307" --silent; do
    sleep 1
done
echo "MySQL database is ready."
fi
echo "Running Go application..."
go run cmd/main.go
# exec air -c air.toml