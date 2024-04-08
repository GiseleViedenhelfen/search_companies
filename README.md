## Search companies
The purpose of this project is to search for the most recently registered companies and send emails to them offering accounting services.

## Development
This application was built using TypeScript and Node.js for scraping and sending emails. Puppeteer was used for scraping, and Nodemailer was used for sending emails. The API for storing company data was built with Go, and MariaDB was used as its database.
## How to run
The API and Mailer service directories require an ".env" file to run as expected. The values can be chosen by the user, but the "port" must be the same in both files, and the email must be a Gmail one. Some example values are provided below:

* For the api directory:
PORT=3000
DB_PASSWORD=PASS123
DB_NAME=TODO_API
DB_ROOTPASS=PASS123
DB_PORT=3307
DB_USER=USER

* For the mailer directory:
SENDER=your_name@gmail.com
SENDER_PASS= yourGmailPassword
PORT=3000

Once this is set up, navigate to the root directory in the terminal and run the command "./entrypoint.sh". This will execute scraping, start a Docker container for the database, launch the API, and then retrieve data from there to send emails.