import { Page } from "puppeteer";
import { inputs, mei, email, successButton } from "../consts";

export default async function form(page: Page) {
  await page.click("h1");
  for (const input of Object.values(inputs)) {
    await page.type(input.tag, input.value);
    clickOut(page);
  }
  regularButton(page, mei)
  const setEmailField = await page.$$(email);
  if (setEmailField.length <= 2) {
    console.error(
      "Some error occurred while getting page response. Check email field tags"
    );
    process.exit(1);
  }
  await page.click("h1");
  await setEmailField[2].click();
  regularButton(page, successButton)

}
const clickOut = async (frame: Page) => {
  await frame.keyboard.press("ArrowDown");
  await frame.keyboard.press("Enter");
  await frame.click("h1");
};
const regularButton = async (frame: Page, tag: string) => {
  const click = await frame.$(tag);
  if (!click) {
    console.error(
      `Some error occurred while getting page response. Check ${tag} tags`
    );
    process.exit(1);
  }
  await click.click();
}