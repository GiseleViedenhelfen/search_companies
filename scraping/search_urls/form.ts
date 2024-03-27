import { Page } from "puppeteer";
import { inputs, mei, email, successButton, date } from "../consts";
import { getListLength, btnSwitch, setInputValues, setDate} from "../functions/form";
import { delay } from "../helpers";
export default async function (page: Page): Promise<number>{
  for (const input of Object.values(inputs)) {
    await setInputValues(page, input);
    await delay(3000);
  }
  await setDate(page, date)
  // await page.keyboard.press("ArrowDown");
  await delay(2000);

  btnSwitch(page, mei);
  await delay(5000);
  
  const setEmailField = await page.$$(email);
  if (setEmailField.length <= 2) {
    console.error(
      "Some error occurred while getting page response. Check email field tags"
    );
    process.exit(1);
  }
  await setEmailField[2].click();
  await delay(2000);

  btnSwitch(page, successButton);
  await delay(2000);
  const list = await getListLength(page)
  return list;
}


