#!/bin/bash

# Wait until the scraping completion signal file appears
while [ ! -f ../data/scraping_complete ]; do
    echo "Waiting for scraping to complete..."
    sleep 1
done

# Once scraping is complete, start your API service
echo "Scraping is complete. Starting the API service..."
# exec air -c air.toml
exec go run cmd/main.go
