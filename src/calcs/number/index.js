import _ from 'lodash';

/**
 * Determines who had the closest prediction to a given number
 * @param {*} prediction The value that was guessed for a given question
 * @param {*} answer The value set in the key.json file for the given question
 * @param {*} winnerData Comparison data on who the current winner is
 * @param {*} username Username for the person who made the guess
 * @param {*} isBonusQuestion Boolean for if the question being evaluated is the bonus question
 */
export const number = ({
  prediction,
  answer,
  winnerData,
  username,
  isBonusQuestion = false,
}) => {
  const formattedPrediction = parseInt(prediction, 10);
  // If the prediction is not a number or there is no winner data (first time through),
  // automatically return the results
  if (Number.isNaN(formattedPrediction)) {
    return winnerData;
  } else if (!winnerData && !isBonusQuestion) {
    // Assume that the current prediction is the closest if there is no current winner or
    // if the question is not a Bonus Question. Bonus Question guess always has to be exact
    return {
      username: [username],
      prediction: formattedPrediction,
    };
  }

  // If the current question being evaluated is a Bonus Question, the prediction has to be exact
  if (isBonusQuestion) {
    if (formattedPrediction === answer) {
      const data = winnerData ? _.cloneDeep(winnerData) : { username: [] };
      data.username.push(username);
      return {
        username: data.username,
        prediction: formattedPrediction,
        isBonusQuestion,
      };
    }

    // No bonus winner, return what was passed in
    return winnerData;
  }

  // Determine closest guess or if there is a tie
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
