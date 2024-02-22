
import { root } from "../consts.js";
import { connect } from "../helpers.js";
import {  Page } from "puppeteer";
export default async function(): Promise<Page> {
  try {
    const page = await connect()
    const response = await page.goto(root);
    if (!response) {
      console.error("Some error occurred while getting page response");
      process.exit(1);
    }
    return page

  } catch (error) {
    console.error("Error in root_url:", error);
    process.exit(1);
  }
};
