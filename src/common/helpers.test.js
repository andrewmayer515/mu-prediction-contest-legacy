const helpers = require('./helpers');

const data = [
  {
    username: 'Test1',
    comment: [
      '1. Total Game Points:',
      '2. MU points:',
      '3. DU points:',
      '4. TO\'s forced by MU:',
      '5. TO\'s forced by DU:',
      '6. MU total made 3\'s:',
      '7. MU top scorer and how many:',
      '8. MU top assist man and how many:',
      '9. MU top rebounder and how many:',
      '10. MU top 3-point shooter and how many:',
      '',
      'Bonus Question (TBD points): Predict Marquette\'s shooting percentage. (Example:  55%,  73%, 41%, etc.)',
    ],
  },
  {
    username: 'Test2',
    comment: [
      '1. Total Game Points: 147',
      '2. MU points:  78',
      '3. DU points: 69',
      '4. TO\'s forced by MU: 18',
      '5. TO\'s forced by DU: 12',
      '6. MU total made 3\'s: 5',
      '7. MU top scorer and how many: Blue - 17',
      '8. MU top assist man and how many: Junior - 5',
      '9. MU top rebounder and how many: Lockett - 7',
      '10. MU top 3-point shooter and how many: Mayo - 2',
      '',
      'Bonus Question (TBD points): Predict Marquette\'s shooting percentage. (Example:  55%,  73%, 41%, etc.)  52%',
    ],
  },
  {
    username: 'Test3',
    comment: [
      'Quote from: TallTitan34 on February 08, 2013, 12:19:48 PM',
      '1. Total Game Points:137',
      '2. MU points: 75',
      '3. DU points:62',
      '4. TO\'s forced by MU: 15',
      '5. TO\'s forced by DU:11',
      '6. MU total made 3\'s: 4',
      '7. MU top scorer and how many: Blue 16',
      '8. MU top assist man and how many:Cadougan 4',
      '9. MU top rebounder and how many: Lockett 9',
      '10. MU top 3-point shooter and how many: Blue 2',
      '',
      'Bonus Question (TBD points): Predict Marquette\'s shooting percentage. (Example:  55%,  73%, 41%, etc.) ',
      '48%',
    ],
  },
];

describe('removePredictionsWithQuotes', () => {
  test('remove posts with quotes', () => {
    const expected = [
      {
        username: 'TallTitan34',
        comment: [
          '1. Total Game Points:',
          '2. MU points:',
          '3. DU points:',
          '4. TO\'s forced by MU:',
          '5. TO\'s forced by DU:',
          '6. MU total made 3\'s:',
          '7. MU top scorer and how many:',
          '8. MU top assist man and how many:',
          '9. MU top rebounder and how many:',
          '10. MU top 3-point shooter and how many:',
          '',
          'Bonus Question (TBD points): Predict Marquette\'s shooting percentage. (Example:  55%,  73%, 41%, etc.)',
        ],
      },
      {
        username: 'Abode4life',
        comment: [
          '1. Total Game Points: 147',
          '2. MU points:  78',
          '3. DU points: 69',
          '4. TO\'s forced by MU: 18',
          '5. TO\'s forced by DU: 12',
          '6. MU total made 3\'s: 5',
          '7. MU top scorer and how many: Blue - 17',
          '8. MU top assist man and how many: Junior - 5',
          '9. MU top rebounder and how many: Lockett - 7',
          '10. MU top 3-point shooter and how many: Mayo - 2',
          '',
          'Bonus Question (TBD points): Predict Marquette\'s shooting percentage. (Example:  55%,  73%, 41%, etc.)  52%',
        ],
      },
    ];
    expect(helpers.removePredictionsWithQuotes(data)).toEqual(expected);
  });
});
