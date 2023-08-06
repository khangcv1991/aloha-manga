import puppeteer from 'puppeteer';

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Open a new browser page
  const page = await browser.newPage();

  // Navigate to the target website
  await page.goto('https://hentai18.net');

  // Perform scraping operations
  const data = await page.evaluate(() => {
    // Write your scraping logic here
    // You can use standard DOM manipulation methods
    // to extract the data you need from the page

    // Example: Extract all the text content from all <h1> tags
    const headings = Array.from(document.querySelectorAll('img'));
    const extractedData = headings.map(
      (h: HTMLHeadingElement) => h.textContent,
    );

    return extractedData;
  });

  // Log the extracted data
  console.log(data);

  // Close the browser
  await browser.close();
})();
