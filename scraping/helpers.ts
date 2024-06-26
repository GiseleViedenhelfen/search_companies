import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";
import { Browser, Page } from "puppeteer";

export interface Company {
  cnpj: string;
  subscribed: number,
  mails_sent: number,
  corporate_name: string;
  registered_capital: string;
  legal_form: string;
  phone: string;
  mail: string;
  main_activity: string;
}
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connect(): Promise<Page> {
  puppeteer.use(StealthPlugin());

  const browser: Browser = await puppeteer.launch({
    headless: true,
    executablePath: 'google-chrome-stable', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page: Page = await browser.newPage();
  return page;
}
export function getDate(): string {
  const currentDate: Date = new Date();
  const yesterdayDate: Date = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate());

  const year: number = yesterdayDate.getFullYear();
  const month: number = yesterdayDate.getMonth() + 1;
  const day: number = yesterdayDate.getDate() -1;

  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  const formattedDate: string = `${formattedDay}-${formattedMonth}-${year}`;
  
  return formattedDate;
}

