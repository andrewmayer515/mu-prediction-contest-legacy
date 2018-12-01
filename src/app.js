/* eslint-disable no-await-in-loop, no-loop-func */
import puppeteer from 'puppeteer';
import ora from 'ora';
import fs from 'fs';
import { main } from './common';

const args = process.argv.slice(2);
const isDebug = args.includes('debug');
const isLogin = args.includes('login');

const launchSettings = isDebug ? { headless: false, args: ['about:blank'] } : { args: ['about:blank'] };

let key;
let spinner;
let totalPages;
let hasAllPageOption;
let pageIndex = 0;
let usernameArray = [];
let commentArray = [];


// Async function starts on run
(async () => {
  // If the key is not set, default to the example until it is created
  try {
    key = await require('./data/key'); // eslint-disable-line global-require, import/no-unresolved
    spinner = ora({ text: 'Calculating...', color: 'yellow' }).start();
  } catch (e) {
    key = await require('./data/key-example'); // eslint-disable-line global-require
    spinner = ora({ text: '--- RUNNING WITH SAMPLE DATA, REFER TO README.MD ---', color: 'yellow' }).start();
  }

  const browser = await puppeteer.launch(launchSettings);
  const page = await browser.newPage();

  // Forces the browser view to fill the viewport size while running as debug
  if (isDebug) {
    await page._client.send('Emulation.clearDeviceMetricsOverride'); // eslint-disable-line no-underscore-dangle
  }

  await page.goto(key.results.url, { waitUntil: 'networkidle2' });
  await page.bringToFront();

  // Login if the arg was passed in
  if (isLogin) {
    const auth = await JSON.parse(fs.readFileSync('data/auth.json'));
    await page.click('#guest_form > input.input_text');
    await page.keyboard.type(auth.username);
    await page.click('#guest_form > input.input_password');
    await page.keyboard.type(auth.password);
    await page.click('#guest_form > input.button_submit');
    await page.waitForNavigation();
  }

  // Check to see if the All page selection exists
  try {
    // Will fail if it can't find the All button on page
    const text = await page.evaluate(() => document.querySelector('.floatleft > a:nth-last-child(1)').textContent); // eslint-disable-line no-undef
    if (text !== 'All') {
      throw new Error();
    }
    hasAllPageOption = true;
  } catch (e) {
    hasAllPageOption = false;
  }

  // Get the total number of pages
  try {
    if (hasAllPageOption) {
      // More then 1 page, has All option
      totalPages = await page.evaluate(() => parseInt(document.querySelector('a.navPages:nth-last-child(2)').textContent, 10)); // eslint-disable-line no-undef
    } else {
      // More then 1 page, no All option
      totalPages = await page.evaluate(() => parseInt(document.querySelector('a.navPages:nth-last-child(1)').textContent, 10)); // eslint-disable-line no-undef
    }
  } catch (e) {
    // If it gets here, there is only one page
    totalPages = 1;
  }

  // Cycle through the pages on the prediction post, gather username and comment data
  const updatedURL = key.results.url.slice(0, -1);
  while (pageIndex < totalPages) {
    if (pageIndex !== 0) {
      const index = pageIndex * 25;
      await page.goto(`${updatedURL}${index}`, { waitUntil: 'networkidle2' });
      await page.bringToFront();
    }

    usernameArray = [...usernameArray, ...await page.evaluate(() => [...document.querySelectorAll('.poster > h4')].map(elem => elem.innerText))]; // eslint-disable-line no-undef
    commentArray = [...commentArray, ...await page.evaluate(() => [...document.querySelectorAll('.post > .inner')].map(elem => elem.innerText))]; // eslint-disable-line no-undef
    pageIndex += 1;
  }

  // Combine all posts to get prediction data
  const data = [];
  await usernameArray.forEach((value, index) => {
    data.push({
      username: usernameArray[index],
      comment: commentArray[index].split('\n'),
    });
  });

  await main(data, key.results);
  spinner.stop();

  // Keep browser open while running as debug
  if (!isDebug) {
    await browser.close();
  }
})();
