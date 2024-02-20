import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { page_url } from '../consts.js';
import { Browser } from "puppeteer";
import form from "./form.js";

(async function (){
  try {
    puppeteer.use(StealthPlugin());

    const browser: Browser = await puppeteer.launch({
      headless: false,
      executablePath: puppeteer.executablePath(),
    });

    const page = await browser.newPage();

    if (!page_url) {
      console.error('URL is not defined in the .env file');
      process.exit(1);
    }

    const response = await page.goto(page_url);
    if (!response) {
        console.error('Some error occurred while getting page response');
        process.exit(1);
      }
      await form(page)

  } catch (error) {
    console.error('Error in root_url:', error);
    process.exit(1);
  }
})()

