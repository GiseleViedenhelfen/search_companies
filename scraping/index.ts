import scraping from "./search_urls/index";
import { companyPerPage } from "./urls";
 (async () => {
  try {
    const paths = await scraping() 
    await companyPerPage(paths)
 
  } catch(error) {
   
    console.error("Error in index.ts:", error);
    process.exit(1);
  }
})()