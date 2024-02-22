import connect from "./connect";
import form from "./form";
import paths from "./paths";

export default async (): Promise<string[]> => {
  const page = await connect();
  const params = await form(page);
  const pathList = await paths(page, params);
  await page.close();
  return pathList;
};
