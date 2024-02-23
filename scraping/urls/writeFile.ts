import { Page } from "puppeteer";
import extractCompanyData from "./extractData";
import fs from "fs";
import { Company } from "../helpers";
import path from "path";
import { filePath } from "../consts";

const file = path.resolve(__dirname, filePath);
console.log(file)
if (fs.existsSync(file)) {
  fs.unlinkSync(file);
  console.log('Existing companyData.json file deleted');
}
export default async function (page: Page) {
  const data = await extractCompanyData(page);
  if (data) {
    if (fs.existsSync(file)) {
      const existingData = fs.readFileSync(file, "utf-8");

      let jsonData: Company[] = [];

      try {
        jsonData = JSON.parse(existingData);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        process.exit(1);
      }
      jsonData.push(data);

      const updatedData = JSON.stringify(jsonData, null, 2);
      console.log("New data added to data.json");

      fs.writeFileSync(file, updatedData);
    } else {
      fs.writeFileSync(file, JSON.stringify([data], null, 2));
      console.log("New data.json file created");
    }
  }
}
