const usernames = [
  'TallTitan34',
  'The Process',
  'LloydMooresLegs',
  '4everwarriors',
  'AlienWarrior',
  'bilsu',
  'mubb34',
  'MUfan12',
  'BM1090',
  'Scooter22',
  'Scooter22',
  'WayOfTheWarrior',
  'jeffreyweee',
  'National Champs',
  'T-Bone',
  'MU B2002',
  'MerrittsMustache',
  'Abode4life',
  'cj111',
  'JD',
  'MU_83_florida',
  'marquettejr',
  'nyg',
  'TVDirector',
  'deep vacuum',
];

const commentSample = `I'll go first.

1. Total Game Points: 136
2. MU points: 74
3. DU points: 62
4. TO's forced by MU: 16
5. TO's forced by DU: 12
6. MU total made 3's: 5
7. MU top scorer and how many: 13lue, 18
8. MU top assist man and how many: Junior, 6
9. MU top rebounder and how many: Ox, 7
10. MU top 3-point shooter and how many: 13lue, 2

Bonus Question (TBD points): Predict Davidson's three point percentage to the nearest whole percent. 24`;

describe('Puppeteer tests on MUSCOOP', () => {
  beforeAll(async () => {
    await page.goto('https://www.muscoop.com/index.php?topic=37247.0');
  });

  test('should display "muscoop" text on page', async () => {
    await expect(page).toMatch('muscoop');
  });

  test('should get all the username data on the first page', async () => {
    // Copy seletor used in app.js
    const usernameArray = await page.evaluate(() =>
      [...document.querySelectorAll('.poster > h4')].map(elem => elem.innerText)
    );
    expect(usernameArray).toEqual(usernames);
  });

  test('should get single user comment data on the first page', async () => {
    // Copy seletor used in app.js
    const commentArray = await page.evaluate(() =>
      [...document.querySelectorAll('.post > .inner')].map(elem => elem.innerText)
    );
    expect(commentArray[1]).toEqual(commentSample);
  });
});
