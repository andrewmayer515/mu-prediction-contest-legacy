/* eslint no-console: 0 */
const _ = require('lodash');
const CONSTANTS = require('../common/constants');

const { TYPE } = CONSTANTS;

const header = () => {
  console.log('');
  console.log('');
  console.log('Results:');
  console.log('-------');
};

const questionWinners = (results, key) => {
  Object.keys(key).forEach((question, index) => {
    if (question.indexOf(CONSTANTS.QUESTION) !== -1 || question.indexOf(CONSTANTS.BONUS) !== -1) {
      const answer = key[question].type === TYPE.PLAYER_NUMBER
        ? `${key[question].answer.player} - ${key[question].answer.number}`
        : key[question].answer;
      const prefix = question === 'bonus' ? 'Bonus.' : `${index + 1}.`;
      const winner = results[index].username.join(', ');
      const prediction = results[index].prediction
        ? `(${results[index].prediction})`
        : '';

      console.log(`${prefix} ${key[question].text} ${answer}`);
      console.log(`   ${winner} ${prediction}`);
    } else if (question !== 'url') {
      console.log(`Error with the following question: ${key[question].text}`);
      console.log('Verify key.js file has been set correctly');
    }
  });
};

const summary = (results, key) => {
  // Create an array of all winners
  const winnerList = [];
  _.forEach(results, (result) => {
    const isBonusQuestion = _.get(result, 'isBonusQuestion', false);
    // If the question was a Bonus Question, more than 1 point could be awarded depending
    // on the 'points' value set for the Bonus Question
    if (isBonusQuestion) {
      const points = _.get(key, 'bonus.points', 1);
      result.username.forEach((winner) => {
        _.times(points, () => {
          winnerList.push(winner);
        });
      });
    } else { // Process normally
      result.username.forEach((winner) => {
        if (winner !== CONSTANTS.NO_WINNER) {
          winnerList.push(winner);
        }
      });
    }
  });

  // Count duplicates
  const counts = {};
  winnerList.forEach((winner) => {
    counts[winner] = (counts[winner] || 0) + 1;
  });

  // Sort results, order from most duplicates to fewest
  const sortedResults = [];
  Object.keys(counts).forEach((item) => {
    sortedResults.push([item, counts[item]]);
  });
  sortedResults
    .sort((a, b) => a[1] - b[1])
    .reverse();

  console.log('');
  console.log('');
  console.log('Game Totals:');
  console.log('-----------');
  sortedResults.forEach(result => console.log(`${result[0]} - ${result[1]}`));
};

const displayResults = (results, key) => {
  header();
  questionWinners(results, key);
  summary(results, key);
};

module.exports = {
  displayResults,
  header,
  questionWinners,
  summary,
};
