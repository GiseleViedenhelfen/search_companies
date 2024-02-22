import { Page } from "puppeteer";
import extractCompanyData from "./extractData";
import fs from "fs";
import { Company } from "../helpers";
import { filePath } from "../consts";

if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
  console.log('Existing companyData.json file deleted');
}
export default async function (page: Page) {
  const data = await extractCompanyData(page);
  if (data) {
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath, "utf-8");

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

      fs.writeFileSync(filePath, updatedData);
    } else {
      fs.writeFileSync(filePath, JSON.stringify([data], null, 2));
      console.log("New data.json file created");
    }
  }
}
