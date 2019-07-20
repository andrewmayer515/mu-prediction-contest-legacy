/* eslint-disable no-await-in-loop, no-loop-func, no-undef */
import puppeteer from 'puppeteer';
import fs from 'fs';
import { main } from './app/common';

const args = process.argv.slice(2);
const isDebug = args.includes('debug');
const isLogin = args.includes('login');

// Async function starts on run
export const results = async ctx => {
  let totalPages;
  let hasAllPageOption;
  let pageIndex = 0;
  let usernameArray = [];
  let commentArray = [];

  const { key, postNumber } = ctx.request.body;
  const url = `https://www.muscoop.com/index.php?topic=${postNumber}`;
  const browser = await puppeteer.launch({ headless: true, args: ['about:blank'] });
  const page = await browser.newPage();

  // Forces the browser view to fill the viewport size while running as debug
  if (isDebug) {
    await page._client.send('Emulation.clearDeviceMetricsOverride'); // eslint-disable-line no-underscore-dangle
  }

  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
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
    const text = await page.evaluate(
      () => document.querySelector('.floatleft > a:nth-last-child(1)').textContent
    ); // eslint-disable-line no-undef
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
      totalPages = await page.evaluate(() =>
        parseInt(document.querySelector('a.navPages:nth-last-child(2)').textContent, 10)
      ); // eslint-disable-line no-undef
    } else {
      // More then 1 page, no All option
      totalPages = await page.evaluate(() =>
        parseInt(document.querySelector('a.navPages:nth-last-child(1)').textContent, 10)
      ); // eslint-disable-line no-undef
    }
  } catch (e) {
    // If it gets here, there is only one page
    totalPages = 1;
  }

  // Cycle through the pages on the prediction post, gather username and comment data
  while (pageIndex < totalPages) {
    if (pageIndex !== 0) {
      const index = pageIndex * 25;
      await page.goto(`${url}${index}`, { waitUntil: 'networkidle2' });
      await page.bringToFront();
    }

    usernameArray = [
      ...usernameArray,
      ...(await page.evaluate(() =>
        [...document.querySelectorAll('.poster > h4')].map(elem => elem.innerText)
      )),
    ]; // eslint-disable-line no-undef
    commentArray = [
      ...commentArray,
      ...(await page.evaluate(() =>
        [...document.querySelectorAll('.post > .inner')].map(elem => elem.innerText)
      )),
    ]; // eslint-disable-line no-undef
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

  await main(data, key);

  // Keep browser open while running as debug
  if (!isDebug) {
    await browser.close();
  }
};
