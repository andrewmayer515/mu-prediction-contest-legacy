import { playerNumber } from './index';

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
    expect(playerNumber(params)).toEqual(expected);
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
    expect(playerNumber(params)).toEqual(expected);
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
    expect(playerNumber(params)).toEqual(expected);
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
    expect(playerNumber(params)).toEqual(expected);
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
    expect(playerNumber(params)).toEqual(expected);
  });
});
