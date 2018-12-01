import { determineQuestionWinner, main } from './index';
import { displayResults } from '../output';

describe('common', () => {
  const data = [
    {
      comment: [
        '1. Total Game Points: 147',
        '2. MU top scorer and how many: Cadougan 20',
        'Bonus Question. Predict Marquettes shooting percentage: 52%',
      ],
      username: 'Andrew',
    },
    {
      comment: [
        '1. Total Game Points: 151',
        '2. MU top scorer and how many',
        'Bonus Question. Predict Marquettes shooting percentage: 65%',
      ],
      username: 'Test',
    },
    {
      comment: [
        '1. Total Game Points: ',
        '2. MU top scorer and how many: Gardner 18',
        'Bonus Question. Predict Marquettes shooting percentage: 58%',
      ],
      username: 'Test2',
    },
  ];
  describe('determineQuestionWinner', () => {
    test('return winner when winner data was returned', () => {
      const result = 'question1';
      const params = {
        answer: 167,
        text: 'Total Game Points:',
        type: 'number',
      };

      const expected = {
        answer: params.answer,
        prediction: 151,
        username: ['Test'],
      };
      expect(determineQuestionWinner(data, result, params)).toEqual(expected);
    });
    test('return no winner when no winner data was returned', () => {
      const result = 'question2';
      const params = {
        text: 'MU top scorer and how many:',
        answer: {
          player: ['Vander Blue'],
          number: 18,
        },
        type: 'playerNumber',
      };

      const expected = {
        answer: {
          player: ['Vander Blue'],
          number: 18,
        },
        username: ['No winner'],
      };
      expect(determineQuestionWinner(data, result, params)).toEqual(expected);
    });
  });
  describe('main', () => {
    test('should call displayResults', () => {
      displayResults = jest.fn();

      const key = {
        question1: {
          text: 'Total Game Points:',
          answer: 167,
          type: 'number',
        },
        question2: {
          text: 'MU Points:',
          answer: 89,
          type: 'number',
        },
        bonus: {
          answer: 56.4,
          type: 'number',
          text: 'Predict Marquette\'s shooting percentage:',
        },
        badData: {
          answer: 4681233,
          type: 'number',
          text: 'An example of bad data:',
        },
      };

      main(data, key);
      expect(displayResults.mock.calls.length).toBe(1);
      expect(displayResults.mock.calls[0][1]).toBe(key);
    });
  });
});
