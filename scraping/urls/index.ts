import { page_url } from "../consts";
import { connect, delay } from "../helpers";
import writeJsonData from "./writeFile";

export async function companyPerPage(paths: string[]) {
  const page = await connect();
  while (paths.length > 0) {
    try {
      await page.goto(page_url + paths[0]);
      await page.waitForSelector(".column.is-narrow");
      await writeJsonData(page)
      await delay(2000)
      paths.shift()
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        return companyPerPage(paths)
      }
      console.error("Some error occurred while getting page response");
      process.exit(1);
      
    }
  console.log(`There are still ${paths.length} urls to run into`)
  }
  page.close()
  process.exit(1);
}