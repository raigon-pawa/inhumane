const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });

  try {
    const page = await browser.newPage();
    await page.goto('https://humanbenchmark.com/tests/typing', {
      waitUntil: "domcontentloaded"
    });
    await page.waitForSelector('.letters.notranslate', { visible: true });

    const typingText = await page.$$eval(".letters.notranslate span", el =>
        el.map(({ innerText }) => innerText)
      );

    typingText.forEach(key => {
      page.keyboard.press(key)
    })

    console.log('Text input complete.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // await browser.close();
  }
})();
