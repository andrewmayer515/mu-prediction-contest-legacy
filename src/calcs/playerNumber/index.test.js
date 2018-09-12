const playerNumber = require('./index');

describe('reasonablePlayerGuesses', () => {
  test('return an array of player names to match', () => {
    const players = ['Markus Howard'];
    const expected = ['markushoward', 'markus', 'howard', 'mhoward'];
    expect(playerNumber.reasonablePlayerGuesses(players)).toEqual(expected);
  });
  test('return an array of player names to match when the answer lists more than one player', () => {
    const players = ['Markus Howard', 'Sam Hauser'];
    const expected = ['markushoward', 'markus', 'howard', 'mhoward', 'samhauser', 'sam', 'hauser', 'shauser'];
    expect(playerNumber.reasonablePlayerGuesses(players)).toEqual(expected);
  });
});

describe('isMatchFound', () => {
  const playerFormats = ['markushoward', 'markus', 'howard', 'mhoward'];
  test('return true when a match is found', () => {
    expect(playerNumber.isMatchFound(playerFormats, 'markus')).toEqual(true);
    expect(playerNumber.isMatchFound(playerFormats, 'marcus')).toEqual(true); // 1 off
    expect(playerNumber.isMatchFound(playerFormats, 'marcas')).toEqual(true); // 2 off
  });
  test('return false when a match is not found', () => {
    expect(playerNumber.isMatchFound(playerFormats, 'andrew')).toEqual(false);
    expect(playerNumber.isMatchFound(playerFormats, 'murcas')).toEqual(false); // 3 off
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
  test('return updated winner data when the player and the current winner have the same guess', () => {
    const params = {
      prediction: 'Vander Blue - 10',
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
      username: ['test2', 'test'],
      prediction: 'Vander Blue - 10',
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
