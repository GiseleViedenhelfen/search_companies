import { Page } from "puppeteer";

export async function urlsPerPage(page: Page): Promise<string[]> {
  const urls: (string | null)[] = await page.evaluate(() => {
    const elements = document.querySelectorAll(".box a");
    const urls = Array.from(elements, (a) => a.getAttribute("href"));
    return urls;
  });
  const validUrls: string[] = urls.filter(
    (url) => typeof url === "string"
  ) as string[];
  return validUrls;
}
export async function nextPage(page: Page): Promise<void> {
  await page.evaluate(() => {
    const nextPageButton: HTMLElement | null = document.querySelector(
      ".pagination-link.pagination-next"
    );
    if (nextPageButton) {
      nextPageButton.click();
    }
  });
}