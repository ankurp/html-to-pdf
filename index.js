const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

// Disable GPU acceleration unless needed
chromium.setGraphicsMode = false;

exports.handler = async (event) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const { html } = JSON.parse(event.body);
  const page = await browser.newPage();
  await page.setContent(html, {
    waitUntil: "networkidle0"
  });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: "15mm" }
  });

  pdfBase64 = await pdf.toString('base64');

  await browser.close();

  return {
    "statusCode": 200,
    "headers": {
      'Content-type': 'application/pdf'
    },
    "body": pdfBase64,
    "isBase64Encoded": true
  };
}
