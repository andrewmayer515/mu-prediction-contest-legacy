const puppeteer = require('puppeteer');
const auth = require('../config/auth.json');

const args = process.argv.slice(2);
const launchSettings = args.includes('--debug') ? { headless: false } : {};

(async () => {
  const browser = await puppeteer.launch(launchSettings);
  const page = await browser.newPage();
  await page.goto('https://www.muscoop.com/index.php?topic=35990.0');

  await page.click('#guest_form > input.input_text');
  await page.keyboard.type(auth.username);

  await page.click('#guest_form > input.input_password');
  await page.keyboard.type(auth.password);

  await page.click('#guest_form > input.button_submit');
  await page.waitForNavigation();

  // Total length of posts on a page
  // const elements = await page.$$('#quickModForm > div')
  // console.log(elements.length);

  // Gets the text on a post (need to figure out how to loop through them all on a page)
  // const text = await page.evaluate(() => document.querySelector('#msg_448588').innerText);
  // console.log(text);
  // await browser.close();
})();
