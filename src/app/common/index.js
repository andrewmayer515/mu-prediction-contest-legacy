import _find from 'lodash.find';
import { displayResults } from '../output';
import { NO_WINNER } from './constants';
import calcs from '../calcs';

/**
 * Loop through predictions for a given question and call its calculation function
 * @param {Object} data All comments data on the post
 * @param {Number} index The current question being evaluated from the key.js file
 * @param {Object} props Properties of question
 * @param {Boolean} isBonusQuestion  Boolean for if the question being evaluated is the bonus question
 */
export const determineQuestionWinner = (data, index, props, isBonusQuestion) => {
  // Get the line for the question currently being evaluated (IE 1., 2., Bonus, etc...)
  const questionLine = props.bonus ? 'Bonus' : index;

  let winnerData;
  data.forEach(entry => {
    const predictionLine = _find(
      entry.comment,
      commentLine => commentLine.indexOf(`${questionLine}`) !== -1
    );
    if (predictionLine && predictionLine.indexOf(':') !== -1) {
      const prediction = predictionLine.split(':')[1].trim();
      if (prediction !== '') {
        winnerData = calcs[props.type]({
          prediction,
          answer: props.answer,
          winnerData,
          username: entry.username,
          isBonusQuestion,
        });
      }
    }
  });

  if (!winnerData) {
    winnerData = {
      username: [NO_WINNER],
    };
  }

  return {
    answer: props.answer,
    ...winnerData,
  };
};

/**
 * Loop through each question in the config, determine winners, send to output
 * @param {*} data All comments data on the post
 * @param {*} key Contents of the answer file (key.js)
 */
export const main = (data, key) => {
  const results = [];
  // Loop through each question in the config
  key.forEach((question, index) => {
    if (question.bonus) {
      results.push(determineQuestionWinner(data, index, question, true));
    } else {
      results.push(determineQuestionWinner(data, index, question, false));
    }
  });

  displayResults(results, key);
};
