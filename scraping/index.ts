import scraping from "./search_urls/index";
import { companyPerPage } from "./urls";
 (async () => {
  try {
    const paths = await scraping() 
    if (paths === null) {
      console.log("There are no companies for this search")
          process.exit(1);
    }
    await companyPerPage(paths)
 
  } catch(error) {
   
    console.error("Error in index.ts:", error);
    // process.exit(1);
  }
})()