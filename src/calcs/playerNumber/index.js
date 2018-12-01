import _ from 'lodash';
import { reasonablePlayerGuesses, isMatchFound } from '../player';
import { number } from '../number';

/**
 * Determines who guessed the player as well as had the closest prediction to a given number
 * @param {*} prediction The value that was guessed for a given question
 * @param {*} answer The value set in the key.js file for the given question
 * @param {*} winnerData Comparison data on who the current winner is
 * @param {*} username Username for the person who made the guess
 * @param {*} isBonusQuestion Boolean for if the question being evaluated is the bonus question
 */
export const playerNumber = ({
  prediction,
  answer,
  winnerData,
  username,
  isBonusQuestion = false,
}) => {
  // Regex to break down prediction to just alphanumeric
  const formattedPrediction = prediction.replace(/[^a-z0-9]/gi, '');
  const predictionPlayer = formattedPrediction
    .replace(/[^a-z]/gi, '')
    .toLowerCase();
  const predictionNumber = formattedPrediction.replace(/[^0-9]/gi, '');
  const playerFormats = reasonablePlayerGuesses(answer.player);

  // The player guess matches a reasonable result
  if (isMatchFound(playerFormats, predictionPlayer)) {
    // If this is blank (first time through or no correct player guess),
    // automatically return results
    const numberWinnerData = winnerData ? {
      username: winnerData.username,
      prediction: parseInt(winnerData.prediction.replace(/[^0-9]/gi, ''), 10),
    } : undefined;
    // Use the number calcs to determine who is closer to the correct number
    // if more than one user guessed the player
    const numberResult = number({
      prediction: predictionNumber,
      answer: answer.number,
      winnerData: numberWinnerData,
      username,
      isBonusQuestion,
    });

    if (numberResult.username.includes(username)) {
      if (numberResult.username.length === 1) {
        return {
          username: [username],
          prediction: `${answer.player} - ${predictionNumber}`,
        };
      }
      const data = _.cloneDeep(winnerData);
      data.username.push(username);
      return {
        username: data.username,
        prediction: `${answer.player} - ${predictionNumber}`,
      };
    }
  }

  // No winner, return what was passed in
  return winnerData;
};
