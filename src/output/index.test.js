import fs from 'fs';
import { displayResults, header, questionWinners, summary } from './index';
import { TYPE } from '../constants';

describe('output', () => {
  const results = [
    {
      answer: 167,
      username: ['Test'],
      prediction: 160,
    },
    {
      answer: 89,
      username: ['Andrew'],
      prediction: 80,
    },
    {
      answer: {
        player: ['Markus Howard'],
        number: 18,
      },
      username: ['Andrew'],
      prediction: 16,
    },
    {
      answer: {
        player: ['Sam Hauser'],
        number: 18,
      },
      username: ['No winner'],
    },
    {
      answer: 56,
      username: ['Bonus_Winner'],
      prediction: 56,
      isBonusQuestion: true,
    },
  ];
  const key = {
    question1: {
      text: 'Total Game Points:',
      answer: 167,
      type: TYPE.NUMBER,
    },
    question2: {
      text: 'MU Points:',
      answer: 89,
      type: TYPE.NUMBER,
    },
    question3: {
      text: 'MU top scorer and how many:',
      answer: {
        player: ['Markus Howard'],
        number: 18,
      },
      type: TYPE.PLAYER_NUMBER,
    },
    question4: {
      text: 'MU top rebounder and how many:',
      answer: {
        player: ['Sam Hauser'],
        number: 5,
      },
      type: TYPE.PLAYER_NUMBER,
    },
    bonus: {
      answer: 56,
      type: TYPE.NUMBER,
      text: "Predict Marquette's shooting percentage:",
      points: 3,
    },
  };
  describe('displayResults', () => {
    test('should console log all of the output sections', () => {
      fs.appendFileSync = jest.fn();
      displayResults(results, key);

      expect(fs.appendFileSync.mock.calls[0][1]).toBe('Results:\n');
      expect(fs.appendFileSync.mock.calls[1][1]).toBe('----------\n');
      expect(fs.appendFileSync.mock.calls[2][1]).toBe('1. Total Game Points: 167\n');
      expect(fs.appendFileSync.mock.calls[3][1]).toBe('   Test (160)\n');
      expect(fs.appendFileSync.mock.calls[4][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[5][1]).toBe('2. MU Points: 89\n');
      expect(fs.appendFileSync.mock.calls[6][1]).toBe('   Andrew (80)\n');
      expect(fs.appendFileSync.mock.calls[7][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[8][1]).toBe(
        '3. MU top scorer and how many: Markus Howard - 18\n'
      );
      expect(fs.appendFileSync.mock.calls[9][1]).toBe('   Andrew (16)\n');
      expect(fs.appendFileSync.mock.calls[10][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[11][1]).toBe(
        '4. MU top rebounder and how many: Sam Hauser - 5\n'
      );
      expect(fs.appendFileSync.mock.calls[12][1]).toBe('   No winner \n');
      expect(fs.appendFileSync.mock.calls[13][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[14][1]).toBe(
        "Bonus. Predict Marquette's shooting percentage: 56\n"
      );
      expect(fs.appendFileSync.mock.calls[15][1]).toBe('   Bonus_Winner (56)\n');
      expect(fs.appendFileSync.mock.calls[16][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[17][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[18][1]).toBe('Game Totals:\n');
      expect(fs.appendFileSync.mock.calls[19][1]).toBe('----------------\n');
      expect(fs.appendFileSync.mock.calls[20][1]).toBe('Bonus_Winner - 3\n');
      expect(fs.appendFileSync.mock.calls[21][1]).toBe('Andrew - 2\n');
      expect(fs.appendFileSync.mock.calls[22][1]).toBe('Test - 1\n');
    });
  });
  describe('header', () => {
    test('return console log headers for output', () => {
      fs.appendFileSync = jest.fn();
      header();

      expect(fs.appendFileSync.mock.calls[0][1]).toBe('Results:\n');
      expect(fs.appendFileSync.mock.calls[1][1]).toBe('----------\n');
    });
  });
  describe('questionWinners', () => {
    test('return console log of question winners and answers', () => {
      fs.appendFileSync = jest.fn();
      questionWinners(results, key);

      expect(fs.appendFileSync.mock.calls[0][1]).toBe('1. Total Game Points: 167\n');
      expect(fs.appendFileSync.mock.calls[1][1]).toBe('   Test (160)\n');
      expect(fs.appendFileSync.mock.calls[2][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[3][1]).toBe('2. MU Points: 89\n');
      expect(fs.appendFileSync.mock.calls[4][1]).toBe('   Andrew (80)\n');
      expect(fs.appendFileSync.mock.calls[5][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[6][1]).toBe(
        '3. MU top scorer and how many: Markus Howard - 18\n'
      );
      expect(fs.appendFileSync.mock.calls[7][1]).toBe('   Andrew (16)\n');
      expect(fs.appendFileSync.mock.calls[8][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[9][1]).toBe(
        '4. MU top rebounder and how many: Sam Hauser - 5\n'
      );
      expect(fs.appendFileSync.mock.calls[10][1]).toBe('   No winner \n');
      expect(fs.appendFileSync.mock.calls[11][1]).toBe('\n');
      expect(fs.appendFileSync.mock.calls[12][1]).toBe(
        "Bonus. Predict Marquette's shooting percentage: 56\n"
      );
      expect(fs.appendFileSync.mock.calls[13][1]).toBe('   Bonus_Winner (56)\n');
      expect(fs.appendFileSync.mock.calls[14][1]).toBe('\n');
    });
    test('return console log of error summary if the key file was not set correctly', () => {
      const badKey = {
        wrongFormat: {
          text: 'Total Game Points:',
          answer: 167,
          type: TYPE.NUMBER,
        },
      };
      fs.appendFileSync = jest.fn();
      questionWinners(results, badKey);

      expect(fs.appendFileSync.mock.calls[0][1]).toBe(
        'Error with the following question: Total Game Points:\n'
      );
      expect(fs.appendFileSync.mock.calls[1][1]).toBe(
        'Verify key.js file has been set correctly\n'
      );
    });
    test('return no console log if the line being read is the url', () => {
      const badKey = {
        url: 'https://www.muscoop.com/index.php?topic=35990.0;all',
      };
      fs.appendFileSync = jest.fn();
      questionWinners(results, badKey);

      expect(fs.appendFileSync).not.toHaveBeenCalled();
    });
  });
  describe('summary', () => {
    test('return console log of summarized game total points for each username', () => {
      fs.appendFileSync = jest.fn();
      summary(results, key);

      expect(fs.appendFileSync.mock.calls[1][1]).toBe('Game Totals:\n');
      expect(fs.appendFileSync.mock.calls[2][1]).toBe('----------------\n');
      expect(fs.appendFileSync.mock.calls[3][1]).toBe('Bonus_Winner - 3\n');
      expect(fs.appendFileSync.mock.calls[4][1]).toBe('Andrew - 2\n');
      expect(fs.appendFileSync.mock.calls[5][1]).toBe('Test - 1\n');
    });
    test('return console log of summarized game total points for each username (no bonus winner)', () => {
      const results2 = [
        {
          answer: 167,
          username: ['Test'],
          prediction: 160,
        },
        {
          answer: 89,
          username: ['Andrew'],
          prediction: 80,
        },
        {
          answer: {
            player: ['Markus Howard'],
            number: 18,
          },
          username: ['Andrew'],
          prediction: 16,
        },
        {
          answer: {
            player: ['Sam Hauser'],
            number: 18,
          },
          username: ['No winner'],
        },
        {
          answer: 56,
          username: ['No winner'],
        },
      ];

      fs.appendFileSync = jest.fn();
      summary(results2, key);

      expect(fs.appendFileSync.mock.calls[1][1]).toBe('Game Totals:\n');
      expect(fs.appendFileSync.mock.calls[2][1]).toBe('----------------\n');
      expect(fs.appendFileSync.mock.calls[3][1]).toBe('Andrew - 2\n');
      expect(fs.appendFileSync.mock.calls[4][1]).toBe('Test - 1\n');
    });
  });
});
