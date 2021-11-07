import _get from 'lodash.get';
import _times from 'lodash.times';
import fs, { readFileSync } from 'fs';
import { TYPE, QUESTION, BONUS, NO_WINNER } from '../../../constants';

//---------------------------------------------------------------------

const output = text => {
  fs.appendFileSync('results.txt', `${text}\n`);
};

export const header = () => {
  output('Results:');
  output('----------');
};

export const questionWinners = (results, key) => {
  Object.keys(key).forEach((question, index) => {
    if (question.indexOf(QUESTION) !== -1 || question.indexOf(BONUS) !== -1) {
      const answer =
        key[question].type === TYPE.PLAYER_NUMBER
          ? `${key[question].answer.player} - ${key[question].answer.number}`
          : key[question].answer;
      const prefix = question === 'bonus' ? 'Bonus.' : `${index + 1}.`;
      const winner = results[index].username.join(', ');
      const prediction = results[index].prediction ? `(${results[index].prediction})` : '';

      output(`${prefix} ${key[question].text} ${answer}`);
      output(`   ${winner} ${prediction}`);
      output('');
    } else if (question !== 'url') {
      output(`Error with the following question: ${key[question].text}`);
      output('Verify key.js file has been set correctly');
    }
  });
};

export const summary = (results, key) => {
  // Create an array of all winners
  const winnerList = [];
  results.forEach(result => {
    const isBonusQuestion = _get(result, 'isBonusQuestion', false);
    // If the question was a Bonus Question, more than 1 point could be awarded depending
    // on the 'points' value set for the Bonus Question
    if (isBonusQuestion) {
      const points = _get(key, 'bonus.points', 1);
      result.username.forEach(winner => {
        _times(points, () => {
          winnerList.push(winner);
        });
      });
    } else {
      // Process normally
      result.username.forEach(winner => {
        if (winner !== NO_WINNER) {
          winnerList.push(winner);
        }
      });
    }
  });

  // Count duplicates
  const counts = {};
  winnerList.forEach(winner => {
    counts[winner] = (counts[winner] || 0) + 1;
  });

  // Sort results, order from most duplicates to fewest
  const sortedResults = [];
  Object.keys(counts).forEach(item => {
    sortedResults.push([item, counts[item]]);
  });
  sortedResults.sort((a, b) => a[1] - b[1]).reverse();

  output('');
  output('Game Totals:');
  output('----------------');
  sortedResults.forEach(result => output(`${result[0]} - ${result[1]}`));
};

export const displayResults = (results, key) => {
  // Create result file
  fs.writeFileSync('results.txt', '');

  // Write to it
  header();
  questionWinners(results, key);
  summary(results, key);

  const content = fs.readFileSync('results.txt', 'utf8');

  return content;
};
