#!/bin/bash

# Execute scraping tasks
chmod +x "$0"
echo "Executing scraping tasks..."
./scraping/scraping_entrypoint.sh

# Execute Go tasks
echo "Executing api tasks..."
./api/api_entrypoint.sh

# Execute mailer tasks
echo "Executing mailer tasks..."
./mailer/mailer_entrypoint.sh