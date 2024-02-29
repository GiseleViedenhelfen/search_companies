import { Page } from "puppeteer";
import { delay } from "../helpers";
import {urlsPerPage, nextPage} from "../functions/paths"

export default async function (page: Page, range: number): Promise<string[] | null> {
  const urlContainer: string[] = [];
  const urls = await urlsPerPage(page);
  if (urls === null) {
    return null
  }
  if (range === 0) {
      urlContainer.push(...urls);
    }
  for (let i = 0; i < range - 1; i++) {  
      urlContainer.push(...urls);
    await nextPage(page);
    await delay(2000);
  }

  return urlContainer;
}


