/* eslint no-console: 0 */
const CONSTANTS = require('./constants');

const displayResults = (results, key) => {
  console.log('');
  console.log('');
  console.log('Results:');
  console.log('-------');

  Object.keys(key).forEach((question, index) => {
    if (question.indexOf(CONSTANTS.QUESTION) !== -1 || question.indexOf(CONSTANTS.BONUS) !== -1) {
      const answer = key[question].type === CONSTANTS.PLAYER_NUMBER
        ? `${key[question].answer.player} - ${key[question].answer.number}` : key[question].answer;
      const prefix = question === 'bonus' ? 'Bonus:' : `${index + 1}.`;
      console.log(`${prefix} ${key[question].text} ${answer}`);
      const winner = results[index].username.join(', ');
      console.log(`   ${winner}`);
    }
  });
};

module.exports = {
  displayResults,
};
