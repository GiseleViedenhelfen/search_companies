import { Page } from "puppeteer";
import { inputs, mei, email, successButton, lenButton } from "../consts";
import { getListLength, btnSwitch, setInputValues} from "../functions/form";
import { delay } from "../helpers";
export default async function (page: Page): Promise<number>{
  for (const input of Object.values(inputs)) {
    await setInputValues(page, input);
    await delay(2000);
  }
  btnSwitch(page, mei);

  const setEmailField = await page.$$(email);
  if (setEmailField.length <= 2) {
    console.error(
      "Some error occurred while getting page response. Check email field tags"
    );
    process.exit(1);
  }
  await setEmailField[2].click();
  btnSwitch(page, successButton);
  await delay(5000);
  const list = await getListLength(page, lenButton)
  return list;
}


