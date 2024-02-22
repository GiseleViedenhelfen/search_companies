import { Page } from "puppeteer";
import { getInnerText, stringCleaner, objectFormatter, filterAccountability } from "../functions/file"
import { Company } from "../helpers";


export default async function extractCompanyData(page: Page):Promise<Company | null>{
  try {
    const text = await getInnerText(page);
    const valuesAsArray = stringCleaner(page, text);
    const parsedObject = objectFormatter(valuesAsArray)
    const filter = filterAccountability(parsedObject)
    return filter

  } catch (error: any) {
    if (error.name === 'TimeoutError') {
      return extractCompanyData(page)
  } 
    console.error("Error in url:", error);
    process.exit(1);
  }
};
