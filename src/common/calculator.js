const _ = require('lodash');

// Question result is a number
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

// Question result is a player name followed by a number
const playerNumber = ({
  prediction,
  answer,
  winnerData,
  username,
}) => {
};

module.exports = {
  number,
  playerNumber,
};
