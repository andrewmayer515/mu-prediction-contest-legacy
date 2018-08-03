const _ = require('lodash');

/**
 * Determines who had the closest prediction to a given number
 * @param {*} prediction The value that was guessed for a given question
 * @param {*} answer The value set in the key.json file for the given question
 * @param {*} winnerData Comparison data on who the current winner is
 * @param {*} username Username for the person who made the guess
 */
const number = ({
  prediction,
  answer,
  winnerData,
  username,
}) => {
  const formattedPrediction = parseInt(prediction, 10);
  // If this is blank (first time through), automatically return results
  if (!winnerData || !_.isNumber(formattedPrediction)) {
    return {
      username: [username],
      prediction: formattedPrediction,
    };
  }

  if (Math.abs(answer - formattedPrediction) < Math.abs(answer - winnerData.prediction)) {
    return {
      username: [username],
      prediction: formattedPrediction,
    };
  } else if (Math.abs(answer - formattedPrediction) === Math.abs(answer - winnerData.prediction)) {
    const data = _.cloneDeep(winnerData);
    data.username.push(username);
    return {
      username: data.username,
      prediction: formattedPrediction,
    };
  }

  // No winner, return what was passed in
  return winnerData;
};

module.exports = number;
