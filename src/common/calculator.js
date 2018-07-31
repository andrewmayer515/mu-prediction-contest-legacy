const _ = require('lodash');

/**
 * Breaks apart player name to a an array of reasonable formats for a player name that someone
 * could guess. If the player was Vander Blue, the results would be:
 * ['vanderblue', 'vander', 'blue', 'vblue']
 */
const reasonablePlayerGuesses = (players) => {
  const results = [];
  players.forEach((player) => {
    const playerData = player
      .toLowerCase()
      .split(' ');
    const initialLastName = `${playerData[0].charAt(0)}${playerData[1]}`;
    results.push(`${playerData[0]}${playerData[1]}}`, playerData[0], playerData[1], initialLastName);
  });

  return results;
};

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

/**
 * Determines who guess the player as well as had the closest prediction to a given number
 * @param {*} prediction The value that was guessed for a given question
 * @param {*} answer The value set in the key.js file for the given question
 * @param {*} winnerData Comparison data on who the current winner is
 * @param {*} username Username for the person who made the guess
 */
const playerNumber = ({
  prediction,
  answer,
  winnerData,
  username,
}) => {
  // Regex to break down prediction to just alphanumeric
  const formattedPrediction = prediction.replace(/[^a-z0-9]/gi, '');
  const predictionPlayer = formattedPrediction
    .replace(/[^a-z]/gi, '')
    .toLowerCase();
  const predictionNumber = formattedPrediction.replace(/[^0-9]/gi, '');
  const playerFormats = reasonablePlayerGuesses(answer.player);

  // The player guess matches a reasonable result
  if (playerFormats.includes(predictionPlayer)) {
    // If this is blank (first time through or no correct player guess),
    // automatically return results
    const numberWinnerData = winnerData ? {
      username: winnerData.username,
      prediction: parseInt(winnerData.prediction.replace(/[^0-9]/gi, ''), 10),
    } : undefined;
    // Use the number calculator to determine who is closer to the correct number
    // if more than one user guessed the player
    const numberResult = number({
      prediction: predictionNumber,
      answer: answer.number,
      winnerData: numberWinnerData,
      username,
    });

    if (numberResult.username.includes(username)) {
      if (numberResult.username.length === 1) {
        return {
          username: [username],
          prediction: `${predictionPlayer} - ${predictionNumber}`,
        };
      }
      const data = _.cloneDeep(winnerData);
      data.username.push(username);
      return {
        username: data.username,
        prediction: `${predictionPlayer} - ${predictionNumber}`,
      };
    }
  }

  // No winner, return what was passed in
  return winnerData;
};

module.exports = {
  number,
  playerNumber,
};
