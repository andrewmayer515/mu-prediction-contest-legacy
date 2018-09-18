const player = require('./index');

describe('reasonablePlayerGuesses', () => {
  test('return an array of player names to match', () => {
    const players = ['Markus Howard'];
    const expected = ['markushoward', 'markus', 'howard', 'mhoward'];
    expect(player.reasonablePlayerGuesses(players)).toEqual(expected);
  });
  test('return an array of player names to match when the answer lists more than one player', () => {
    const players = ['Markus Howard', 'Sam Hauser'];
    const expected = ['markushoward', 'markus', 'howard', 'mhoward', 'samhauser', 'sam', 'hauser', 'shauser'];
    expect(player.reasonablePlayerGuesses(players)).toEqual(expected);
  });
});

describe('isMatchFound', () => {
  const playerFormats = ['markushoward', 'markus', 'howard', 'mhoward'];
  test('return true when a match is found', () => {
    expect(player.isMatchFound(playerFormats, 'markus')).toEqual(true);
    expect(player.isMatchFound(playerFormats, 'marcus')).toEqual(true); // 1 off
    expect(player.isMatchFound(playerFormats, 'marcas')).toEqual(true); // 2 off
  });
  test('return false when a match is not found', () => {
    expect(player.isMatchFound(playerFormats, 'andrew')).toEqual(false);
    expect(player.isMatchFound(playerFormats, 'murcas')).toEqual(false); // 3 off
  });
});

describe('player', () => {
  test('return the current winner data back unmodified if the player guess was wrong', () => {
    const params = {
      prediction: 'Vander Blue',
      answer: ['Markus Howard'],
      winnerData: undefined,
      username: 'test',
    };
    const expected = params.winnerData;
    expect(player.player(params)).toEqual(expected);
  });
  test('return updated winner data when there was no previous winner', () => {
    const params = {
      prediction: 'Vander Blue',
      answer: ['Vander Blue'],
      winnerData: undefined,
      username: 'test',
    };
    const expected = {
      username: ['test'],
      prediction: 'Vander Blue',
    };
    expect(player.player(params)).toEqual(expected);
  });
  test('return updated winner data when the player and the current winner were both correct', () => {
    const params = {
      prediction: 'Vander Blue',
      answer: ['Vander Blue'],
      winnerData: {
        username: ['test2'],
        prediction: 'Vander Blue',
      },
      username: 'test',
    };
    const expected = {
      username: ['test2', 'test'],
      prediction: 'Vander Blue',
    };
    expect(player.player(params)).toEqual(expected);
  });
});
