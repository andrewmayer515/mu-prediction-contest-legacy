const _ = require('lodash');
const output = require('./output');
const CONSTANTS = require('./constants');
const calculator = require('./calculator');

// Not going to bother with posts that have quotes in them, skip
const removePredictionsWithQuotes = (data) => {
  const result = _.filter(data, (record) => {
    const quoteFound = _.some(record.comment, commentLine => commentLine.indexOf('Quote from:') !== -1);
    return !quoteFound;
  });
  return result;
};

/**
 * Cycle through predictions for a given question and call its calculation function
 * @param {*} data All comments data on the post
 * @param {*} result The current question being evaluated from the key.js file
 * @param {*} params Properties of result, taken from the key.js file
 */
const determineQuestionWinner = (data, result, params) => {
  const number = result.replace(/[^0-9]/g, '');
  let winnerData;
  data.forEach((record) => {
    const predictionLine = _.find(record.comment, commentLine => commentLine.indexOf(`${number}.`) !== -1);
    if (predictionLine && predictionLine.indexOf(':') !== -1) {
      const prediction = predictionLine.split(':')[1].trim();
      if (prediction !== '') {
        winnerData = calculator[params.type]({
          prediction,
          answer: params.answer,
          winnerData,
          username: record.username,
        });
      }
    }
  });

  if (!winnerData) {
    winnerData = {
      username: ['No winner'],
    }
  }

  return {
    answer: params.answer,
    ...winnerData,
  };
};

const getResults = (data, results) => {
  const resultsArray = [];
  // Cycle through each question in the config
  Object.keys(results).forEach((result) => {
    if (result.indexOf(CONSTANTS.QUESTION) !== -1 || result.indexOf(CONSTANTS.BONUS) !== -1) {
      resultsArray.push(determineQuestionWinner(data, result, results[result]));
    }
  });

  return resultsArray;
};

const predictionator = (data, key) => {
  const sanitizedData = removePredictionsWithQuotes(data);
  const results = getResults(sanitizedData, key);
  output.displayResults(results, key);
};

module.exports = {
  removePredictionsWithQuotes,
  predictionator,
};
