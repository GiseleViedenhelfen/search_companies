import { Page } from "puppeteer";
import { keys } from "../consts";
import { Company } from "../helpers";


export function objectFormatter(arr: string[][]): Company {
  const data: Company = {
    cnpj: "",
    corporate_name: "",
    registered_capital: "",
    legal_form: "",
    phone: "",
    mail: "",
    main_activity: "",
  };
  arr.forEach((item) => {
    switch (item[0]) {
      case "E-MAIL":
        data["mail"] = item[1];
        break;
      case "CNPJ":
        data["cnpj"] = item[1];
        break;
      case "Razão Social":
        data["corporate_name"] = item[1];
        break;
      case "Atividade Principal":
        data["main_activity"] = item[1];
        break;
      case "Natureza Jurídica":
        data["legal_form"] = item[1];
        break;
      case "Telefone":
        data["phone"] = item[1];
        break;
      case "Capital Social":
        data["registered_capital"] = item[1];
        break;
      default:
        break;
    }
  });
  return data;
}

export async function getInnerText(page: Page): Promise<string[]> {
  const rawValues = await page.evaluate(() => {
    const elements: HTMLElement[] = Array.from(
      document.querySelectorAll(".column.is-narrow")
    );
    const texts = elements.map((item) => item.innerText);
    return texts;
  });
  return rawValues;
}

export function stringCleaner(page: Page, values: string[]): string[][] {
  const raw = values.map((i) => i.toString().replace("\n\n", "->").split("->"));
  const resultAsArray = raw.filter((item) => keys.includes(item[0]));
  return resultAsArray;
}

export const filterAccountability = (company: Company): Company | null => {
  if (!/(cont|count)/i.test(company.mail.toLowerCase())) {
    return company;
  } else {
    return null;
  }
};
