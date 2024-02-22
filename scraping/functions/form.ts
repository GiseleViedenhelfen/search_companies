import { Page } from "puppeteer";

export const setInputValues = async (
  frame: Page,
  input: { tag: string; value: string }
) => {
  await frame.type(input.tag, input.value);
  await frame.keyboard.press("ArrowDown");
  await frame.keyboard.press("Enter");
  await frame.click("h1");
};
export const btnSwitch = async (frame: Page, tag: string) => {
  const click = await frame.$(tag);
  if (!click) {
    console.error(
      `Some error occurred while getting page response. Check ${tag} tags`
    );
    process.exit(1);
  }
  await click.click();

};
export async function getListLength(page: Page, tag: string): Promise<number> {
  const listLength = await page.evaluate((selector) => {
      const lastLi = document.querySelector(selector);
      return lastLi ? lastLi.textContent : 0;
  }, tag);

  return Number(listLength);
}