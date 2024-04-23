const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  try {
    const page = await browser.newPage();
    await page.goto('https://humanbenchmark.com/tests/reactiontime', {
      waitUntil: "domcontentloaded"
    });
    await page.waitForSelector('.view-splash.e18o0sx0.css-saet2v.e19owgy77');
    await page.click('.view-splash.e18o0sx0.css-saet2v.e19owgy77');
    await page.waitForSelector('.view-go.e18o0sx0.css-saet2v.e19owgy77');
    await page.click('.view-go.e18o0sx0.css-saet2v.e19owgy77');
  } catch (e) {
    console.error("An error occurred :",e);
  }
})();