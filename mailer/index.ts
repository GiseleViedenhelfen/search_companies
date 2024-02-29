import { editMailSent, fetchCompanies, Company } from "./api/request";
import nodemailer from "nodemailer";
import { options, transporterConfig } from "./config/mailConfig";
import content from "./content/content";
const interval = 5000;
(async function () {
  const companies = await fetchCompanies();
    let currentIndex = 0;
    if (companies) {
      const intervalId = setInterval(async () => {
        if (currentIndex < companies.length) {
          await sendEmail(companies[currentIndex]);
          currentIndex++;
        } else {
          console.log("No more emails to send. Stopping interval.");
          clearInterval(intervalId);
        }
      }, interval);
    } else {
      console.log("There are no new companies to send emails...")
    }
})();

function sendEmail(company: Company) {
  const { cnpj, corporate_name, mail } = company;
  const transporter = nodemailer.createTransport(transporterConfig);
  const mailContent = content(corporate_name, cnpj);
  const mailOptions = options(mail, mailContent);
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error(`Error sending email to ${mail}:`, error);
    } else {
      await editMailSent(company);
      console.log(`Email sent to: ${mail}`, info.response);
    }
  })
}
