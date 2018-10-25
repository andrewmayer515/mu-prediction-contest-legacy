/* eslint-disable no-await-in-loop, no-loop-func */
const puppeteer = require('puppeteer');

const url = 'http://www.espn.com/mens-college-basketball/game?gameId=400986348';

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['about:blank'] });
  const page = await browser.newPage();
  await page._client.send('Emulation.clearDeviceMetricsOverride'); // eslint-disable-line no-underscore-dangle

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.bringToFront();
  await page.click('li.sub.boxscore > a');
  await page.waitForNavigation();
  await page.waitForFunction(
    'document.querySelector("body").innerText.includes("Marquette");',
  );

  // Figure out who is Marquette
  const homeTeam = await page.evaluate(() => document.querySelector('.gamepackage-home-wrap > div > div.content.desktop > div > div.team-name').innerText); // eslint-disable-line no-undef
  const isMarquetteHome = homeTeam === 'Marquette';

  console.log(isMarquetteHome);
})();
