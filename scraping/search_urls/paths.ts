import { Page } from "puppeteer";
import { delay } from "../helpers";
import {urlsPerPage, nextPage} from "../functions/paths"

export default async function (page: Page, range: number): Promise<string[]> {
  const urlContainer: string[] = [];
  if (range === 0) {
    const urls = await urlsPerPage(page);
    urlContainer.push(...urls);
  }
  for (let i = 0; i < range - 1; i++) {
    const urls = await urlsPerPage(page);
    urlContainer.push(...urls);
    await nextPage(page);
    await delay(2000);
  }

  return urlContainer;
}


