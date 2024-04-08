#!/bin/bash
chmod +x "$0"
echo "Executing scraping tasks..."
./scraping/scraping_entrypoint.sh

echo "Executing api tasks..."
source "./api/.env"
./api/api_entrypoint.sh &
while ! nc -z localhost ${PORT}; do
    sleep 1
done
echo "API is running. Starting mailer service..."
./mailer/mailer_entrypoint.sh
echo "Mailer service completed. Killing process on api port ..."
sudo lsof -ti:${PORT} | xargs sudo kill
