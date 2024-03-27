import { configDotenv } from "dotenv";
import path from "path";
const file = path.resolve(__dirname, "../img/logo.png");
configDotenv;
const { SENDER, SENDER_PASS, HOST } = process.env;
export const transporterConfig = {
  host: HOST,
  port: 465,
  secure: true,
  auth: {
    user: SENDER,
    pass: SENDER_PASS,
  },
  socketTimeout: 10 * 1000,
  connectionTimeout: 10 * 1000,
};
export const imageAttachment = {
  filename: "logo.png",
  path: file,
  cid: "unique@image",
};
export function options (mail: string, content: string) {
  const options = {
    from: SENDER,
    to: mail,
    subject: 'Emita ou renove seu certificado digital',
    html: content,
    attachments: [imageAttachment],

  }
  return options
}