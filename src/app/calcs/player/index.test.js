import { reasonablePlayerGuesses, isMatchFound, player } from './index';

jest.mock('../../common/constants');

describe('reasonablePlayerGuesses', () => {
  test('return an array of player names to match including alias', () => {
    const players = ['Markus Howard'];
    const expected = ['markushoward', 'markus', 'howard', 'mhoward', 'm2n'];
    expect(reasonablePlayerGuesses(players)).toEqual(expected);
  });
  test('return an array of player names to match when the answer lists more than one player', () => {
    const players = ['Markus Howard', 'Sam Hauser'];
    const expected = [
      'markushoward',
      'markus',
      'howard',
      'mhoward',
      'm2n',
      'samhauser',
      'sam',
      'hauser',
      'shauser',
    ];
    expect(reasonablePlayerGuesses(players)).toEqual(expected);
  });
});

describe('isMatchFound', () => {
  const playerFormats = ['markushoward', 'markus', 'howard', 'mhoward'];
  test('return true when a match is found', () => {
    expect(isMatchFound(playerFormats, 'markus')).toEqual(true);
    expect(isMatchFound(playerFormats, 'marcus')).toEqual(true); // 1 off
    expect(isMatchFound(playerFormats, 'marcas')).toEqual(true); // 2 off
  });
  test('return false when a match is not found', () => {
    expect(isMatchFound(playerFormats, 'andrew')).toEqual(false);
    expect(isMatchFound(playerFormats, 'murcas')).toEqual(false); // 3 off
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
    expect(player(params)).toEqual(expected);
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
    expect(player(params)).toEqual(expected);
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
    expect(player(params)).toEqual(expected);
  });
});
