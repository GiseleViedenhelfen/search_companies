import { Page } from "puppeteer";
import { delay } from "../helpers";
import { urlsPerPage, nextPage } from "../functions/paths";

export default async function (page: Page, range: number): Promise<string[] | null> {
  const urlContainer: string[] = [];
  if (range === 0) {
    await extractUrls(page, urlContainer)
  } else {
    while (range >= 0) {
      await extractUrls(page, urlContainer)
      await nextPage(page);
      await delay(2000);
      range--;
    }
  }

  return urlContainer;
}

async function extractUrls(page:Page, container : string[]) {
  const urls = await urlsPerPage(page);
  if (urls === null) {
    return null;
  }
  container.push(...urls);
}