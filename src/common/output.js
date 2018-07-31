/* eslint no-console: 0 */
const _ = require('lodash');
const CONSTANTS = require('./constants');

const displayResults = (results, key) => {
  console.log('Results:');
  console.log('-------');

  Object.keys(key).forEach((question, index) => {
    if (question.indexOf(CONSTANTS.QUESTION) !== -1 || question.indexOf(CONSTANTS.BONUS) !== -1) {
      const answer = key[question].type === CONSTANTS.PLAYER_NUMBER
        ? `${key[question].answer.player} - ${key[question].answer.number}` : key[question].answer;
      console.log(`${index + 1}. ${key[question].text} ${answer}`);
      const winner = results[index].username.join(', ');
      console.log(`   ${winner}`)
    }
  });
};

module.exports = {
  displayResults,
};
