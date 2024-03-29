import _find from 'lodash.find';
import { displayResults } from './output';
import { QUESTION, BONUS, NO_WINNER } from './constants';
import questionTypes from './question-types';

/**
 * Loop through predictions for a given question and call its question typw function
 * @param {*} data All comments data on the post
 * @param {*} question The current question being evaluated from the key.js file
 * @param {*} props Properties of question, taken from the key.js file
 * @param {*} isBonusQuestion  Boolean for if the question being evaluated is the bonus question
 */
export const determineQuestionWinner = (data, question, props, isBonusQuestion) => {
  // Get the line for the question currently being evaluated (IE 1., 2., Bonus, etc...)
  const questionLine = isBonusQuestion ? 'Bonus' : `${question.replace(/[^0-9]/g, '')}.`;

  let winnerData;
  data.forEach(entry => {
    const predictionLine = _find(
      entry.comment,
      commentLine => commentLine.indexOf(`${questionLine}`) !== -1
    );
    if (predictionLine && predictionLine.indexOf(':') !== -1) {
      const prediction = predictionLine.split(':')[1].trim();
      if (prediction !== '') {
        winnerData = questionTypes[props.type]({
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
  Object.keys(key).forEach(question => {
    if (question.indexOf(QUESTION) !== -1) {
      results.push(determineQuestionWinner(data, question, key[question], false));
    } else if (question.indexOf(BONUS) !== -1) {
      results.push(determineQuestionWinner(data, question, key[question], true));
    }
  });

  displayResults(results, key);
};
