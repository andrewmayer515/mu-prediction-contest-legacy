const puppeteer = require('puppeteer');
const ora = require('ora');

const auth = require('../data/auth.json');
const key = require('../data/key');
const common = require('./common');

const args = process.argv.slice(2);
const isDebug = args.includes('debug');
const isLogin = args.includes('login');

const launchSettings = isDebug ? { headless: false, args: ['about:blank'] } : { args: ['about:blank'] };

(async () => {
  const spinner = ora({ text: 'Calculating...', color: 'yellow' }).start();
  const browser = await puppeteer.launch(launchSettings);
  const page = await browser.newPage();
  if (isDebug) { // Forces the browser view to fill the viewport size while running as debug
    await page._client.send('Emulation.clearDeviceMetricsOverride'); // eslint-disable-line no-underscore-dangle
  }
  await page.goto(key.results.url, { waitUntil: 'networkidle2' });
  await page.bringToFront();

  // Login if the arg was passed in
  if (isLogin) {
    await page.click('#guest_form > input.input_text');
    await page.keyboard.type(auth.username);
    await page.click('#guest_form > input.input_password');
    await page.keyboard.type(auth.password);
    await page.click('#guest_form > input.button_submit');
    await page.waitForNavigation();
  }
  const usernameArray = await page.evaluate(() => [...document.querySelectorAll('.poster > h4')].map(elem => elem.innerText)); // eslint-disable-line no-undef
  const commentArray = await page.evaluate(() => [...document.querySelectorAll('.post > .inner')].map(elem => elem.innerText)); // eslint-disable-line no-undef

  // Combine all posts to get prediction data
  const data = [];
  await usernameArray.forEach((value, index) => {
    data.push({
      username: usernameArray[index],
      comment: commentArray[index].split('\n'),
    });
  });

  await common.predictionator(data, key.results);
  spinner.stop();

  // Keep browser open while running as debug
  if (!isDebug) {
    await browser.close();
  }
})();
