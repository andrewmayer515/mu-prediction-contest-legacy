/* eslint-disable import/extensions */
/* eslint-disable no-await-in-loop, no-loop-func, no-undef */
import ora from 'ora';
import fs from 'fs';

//---------------------------------------------------------------------

export async function getConfig() {
  let key;
  let spinner;

  // If the key is not set, default to the example until it is created
  try {
    key = await require('../../../config/key'); // eslint-disable-line global-require, import/no-unresolved
    spinner = ora({ text: 'Calculating...', color: 'yellow' }).start();
  } catch (e) {
    key = await require('../../../config/key-example'); // eslint-disable-line global-require
    spinner = ora({
      text: '--- RUNNING WITH SAMPLE DATA, REFER TO README.MD ---',
      color: 'yellow',
    }).start();
  }

  return { key, spinner };
}

export async function loginSteps() {
  const auth = await JSON.parse(fs.readFileSync('data/auth.json'));

  await page.click('#guest_form > input.input_text');
  await page.keyboard.type(auth.username);
  await page.click('#guest_form > input.input_password');
  await page.keyboard.type(auth.password);
  await page.click('#guest_form > input.button_submit');
  await page.waitForNavigation();
}

export async function hasAllPageOption(page) {
  let allPageOptionExists;

  try {
    // Will fail if it can't find the All button on page
    const text = await page.evaluate(
      () => document.querySelector('.floatleft > a:nth-last-child(1)').textContent
    ); // eslint-disable-line no-undef
    if (text !== 'All') {
      throw new Error();
    }
    allPageOptionExists = true;
  } catch (e) {
    allPageOptionExists = false;
  }

  return allPageOptionExists;
}

export async function getTotalPages(page, allPageOption) {
  let totalPages;

  try {
    if (allPageOption) {
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

  return totalPages;
}

export async function getPredictionData(page, totalPages, key) {
  let pageIndex = 0;
  let usernameArray = [];
  let commentArray = [];
  const updatedURL = key.results.url.slice(0, -1);

  while (pageIndex < totalPages) {
    if (pageIndex !== 0) {
      const index = pageIndex * 25;
      await page.goto(`${updatedURL}${index}`, { waitUntil: 'networkidle2' });
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
  const predictionData = [];
  await usernameArray.forEach((value, index) => {
    predictionData.push({
      username: usernameArray[index],
      comment: commentArray[index].split('\n'),
    });
  });

  return predictionData;
}
