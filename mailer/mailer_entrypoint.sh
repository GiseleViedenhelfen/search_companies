#!/bin/bash
cd mailer/
echo "Installing npm dependencies..."
npm install
echo "Building TypeScript files..."
npm run build
echo "Starting the mailer..."
node dist/index.js