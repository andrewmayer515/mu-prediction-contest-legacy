const puppeteer = require('puppeteer');
const ProgressBar = require('progress');
const auth = require('../config/auth.json');
const results = require('../config/results.json');

const args = process.argv.slice(2);
const isDebug = args.includes('--debug');
const launchSettings = isDebug ? { headless: false } : {};
const bar = new ProgressBar(':token [:bar] :elapsed', {
  total: 10,
});

(async () => {
  bar.tick({
    token: 'Logging in...',
  });
  const browser = await puppeteer.launch(launchSettings);
  const page = await browser.newPage();
  if (isDebug) { // Forces the browser view to fill the viewport size while running as debug
    await page._client.send('Emulation.clearDeviceMetricsOverride'); // eslint-disable-line no-underscore-dangle
  }
  await page.goto(results.url);

  await page.click('#guest_form > input.input_text');
  await page.keyboard.type(auth.username);

  await page.click('#guest_form > input.input_password');
  await page.keyboard.type(auth.password);

  await page.click('#guest_form > input.button_submit');
  await page.waitForNavigation();
  await bar.tick({
    token: 'Gathering predictions...',
  });

  // Total length of posts on a page
  const elements = await page.$$('#quickModForm > div');
  // console.log(elements.length);

  const textArray = await page.evaluate(() => [...document.querySelectorAll('.post > .inner')].map(elem => elem.innerText)); // eslint-disable-line no-undef
  // console.log(textArray);

  if (!isDebug) { // Keep browser open while running as debug
    await browser.close();
  }

  await bar.tick({
    token: 'Done!',
  });
})();
