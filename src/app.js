const puppeteer = require('puppeteer');
// const ProgressBar = require('progress');
const auth = require('../config/auth.json');
const results = require('../config/results.json');
const helpers = require('./common/helpers.js');

const args = process.argv.slice(2);
const isDebug = args.includes('--debug');
const launchSettings = isDebug ? { headless: false, devtools: true } : {};
const data = [];

(async () => {
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

  // Total length of posts on a page
  // const elements = await page.$$('#quickModForm > div');
  // console.log(elements.length);

  const usernameArray = await page.evaluate(() => [...document.querySelectorAll('.poster > h4')].map(elem => elem.innerText)); // eslint-disable-line no-undef
  const commentArray = await page.evaluate(() => [...document.querySelectorAll('.post > .inner')].map(elem => elem.innerText)); // eslint-disable-line no-undef

  // combine fields to get prediction data
  await usernameArray.forEach((value, index) => {
    data.push({
      username: usernameArray[index],
      comment: commentArray[index].split('\n'),
    });
  });
  // console.log(data);

  // await page.evaluate(() => {debugger;});
  const output = helpers.calculateWinners(data, results);
  console.log(output);

  if (!isDebug) { // Keep browser open while running as debug
    await browser.close();
  }
})();
