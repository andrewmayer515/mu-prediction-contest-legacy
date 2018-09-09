const puppeteer = require('puppeteer');
const config = require('./config.json');

(async () => {
  const team = config.post.team.toUpperCase();
  const subject = `MAKE YOUR ${team} PREDICTIONS HERE`;

  const browser = await puppeteer.launch({ headless: false, args: ['about:blank'] });
  const page = await browser.newPage();

  // Forces the browser view to fill the viewport size while running as debug
  await page._client.send('Emulation.clearDeviceMetricsOverride'); // eslint-disable-line no-underscore-dangle

  await page.goto('https://www.muscoop.com/index.php?action=post;board=2.0', { waitUntil: 'networkidle2' });
  await page.bringToFront();

  // Login (credentials needed in config file)
  await page.click('#guest_form > input.input_text');
  await page.keyboard.type(config.login.username);
  await page.click('#guest_form > input.input_password');
  await page.keyboard.type(config.login.password);
  await page.click('#guest_form > input.button_submit');
  await page.waitForNavigation();

  // Fill out new topic fields based on config file
  await page.click('#post_header > dd:nth-child(2) > input');
  await page.keyboard.type(subject);
  await page.click('#message');
  await page.keyboard.type(`1. Total Game Points:\n2. MU points:\n3. ${config.post.team} points:\n4. TO's forced by MU:\n5. TO's forced by ${config.post.team}:\n6. MU total made 3's:\n7. MU top scorer and how many:\n8. MU top assist man and how many:\n9. MU top rebounder and how many:\n10. MU top 3-point shooter and how many:\n\n`);
  if (config.post.bonus) {
    await page.keyboard.type(config.post.bonus);
  }

  // Submit
  // await page.click('#post_confirm_buttons > input:nth-child(2)');
})();
