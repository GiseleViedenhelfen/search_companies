#!/bin/bash
# remove old file
rm /usr/src/app/data/scraping_complete
echo "Starting the container..."
# Run the node command

node dist/index.js

# After the node command finishes, copy the file
cp /usr/usr/app/data.json /usr/src/app/data/data.json

# Keep the container running
touch /usr/src/app/data/scraping_complete
exec "$@"
