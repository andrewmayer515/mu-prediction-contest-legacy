const playerNumber = require('./index');

describe('reasonablePlayerGuesses', () => {
  test('return an array of player names to match', () => {
    const players = ['Marcus Howard'];
    const expected = ['marcushoward', 'marcus', 'howard', 'mhoward'];
    expect(playerNumber.reasonablePlayerGuesses(players)).toEqual(expected);
  });
  test('return an array of player names to match when the answer lists more than one player', () => {
    const players = ['Marcus Howard', 'Sam Hauser'];
    const expected = ['marcushoward', 'marcus', 'howard', 'mhoward', 'samhauser', 'sam', 'hauser', 'shauser'];
    expect(playerNumber.reasonablePlayerGuesses(players)).toEqual(expected);
  });
});

describe('playerNumber', () => {
  test('return the current winner data back unmodified if the player guess was wrong', () => {
    const params = {
      prediction: 'Vander Blue - 6',
      answer: {
        player: ['Markus Howard'],
        number: 5,
      },
      winnerData: undefined,
      username: 'test',
    };
    const expected = params.winnerData;
    expect(playerNumber.playerNumber(params)).toEqual(expected);
  });
  test('return updated winner data when there was no previous winner', () => {
    const params = {
      prediction: 'Vander Blue - 6',
      answer: {
        player: ['Vander Blue'],
        number: 5,
      },
      winnerData: undefined,
      username: 'test',
    };
    const expected = {
      username: ['test'],
      prediction: 'Vander Blue - 6',
    };
    expect(playerNumber.playerNumber(params)).toEqual(expected);
  });
  test('return updated winner data when the player was correct and the number was closer', () => {
    const params = {
      prediction: 'Vander Blue - 6',
      answer: {
        player: ['Vander Blue'],
        number: 5,
      },
      winnerData: {
        username: ['test2'],
        prediction: 'Vander Blue - 10',
      },
      username: 'test',
    };
    const expected = {
      username: ['test'],
      prediction: 'Vander Blue - 6',
    };
    expect(playerNumber.playerNumber(params)).toEqual(expected);
  });
  test('return unmodified winner data when the player was correct, but the number was not closer', () => {
    const params = {
      prediction: 'Vander Blue - 15',
      answer: {
        player: ['Vander Blue'],
        number: 5,
      },
      winnerData: {
        username: ['test2'],
        prediction: 'Vander Blue - 10',
      },
      username: 'test',
    };
    const expected = params.winnerData;
    expect(playerNumber.playerNumber(params)).toEqual(expected);
  });
});
