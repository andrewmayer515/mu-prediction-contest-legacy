const number = require('./index');

describe('number', () => {
  test('return the passed in username and prediction when there is no winner data', () => {
    const params = {
      prediction: '10',
      answer: '7',
      winnerData: undefined,
      username: 'test',
    };
    const expected = {
      username: [params.username],
      prediction: 10,
    };
    expect(number(params)).toEqual(expected);
  });
  test('return the current winner data when the guess is not a number', () => {
    const params = {
      prediction: 'a',
      answer: '7',
      winnerData: undefined,
      username: 'test',
    };
    const expected = params.winnerData;
    expect(number(params)).toEqual(expected);
  });
  test('return the passed in username and prediction when the prediction is closer than the previous closest score', () => {
    const params = {
      prediction: '10',
      answer: '7',
      winnerData: {
        username: ['test2'],
        prediction: 11,
      },
      username: 'test',
    };
    const expected = {
      username: [params.username],
      prediction: 10,
    };
    expect(number(params)).toEqual(expected);
  });
  test('return the previous closest score when that prediction was closer than the current prediction', () => {
    const params = {
      prediction: '15',
      answer: '7',
      winnerData: {
        username: ['test2'],
        prediction: 11,
      },
      username: 'test',
    };
    const expected = params.winnerData;
    expect(number(params)).toEqual(expected);
  });
  test('return both usernames when the prediction ties the current winner', () => {
    const params = {
      prediction: '11',
      answer: '7',
      winnerData: {
        username: ['test2'],
        prediction: 11,
      },
      username: 'test',
    };
    const expected = {
      username: ['test2', 'test'],
      prediction: 11,
    };
    expect(number(params)).toEqual(expected);
  });
});
