const puppeteer = require('puppeteer');
const auth = require('../config/auth.json');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.muscoop.com/index.php?topic=35990.0');
  
  await page.click('#guest_form > input.input_text');
  await page.keyboard.type(auth.username);

  await page.click('#guest_form > input.input_password');
  await page.keyboard.type(auth.password);

  await page.click('#guest_form > input.button_submit');
  await page.waitForNavigation();
  // await browser.close();
})();