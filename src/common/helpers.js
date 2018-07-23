const _ = require('lodash');

// Not going to bother with posts that have quotes in them, skip
const removePredictionsWithQuotes = (data) => {
  const result = _.filter(data, (record) => {
    const quoteFound = _.some(record.comment, commentLine => commentLine.indexOf('Quote from:') > -1);
    return !quoteFound;
  });
  return result;
};

const calculateWinners = (data, results) => {
  return removePredictionsWithQuotes(data);
};

module.exports.calculateWinners = calculateWinners;
