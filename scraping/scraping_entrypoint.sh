#!/bin/bash
cd scraping/
echo "Installing npm dependencies..."
npm install
echo "Building TypeScript files..."
npm run build
echo "Starting the scraping..."
node dist/index.js

