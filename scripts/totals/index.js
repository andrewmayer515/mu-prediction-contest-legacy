/* eslint no-console: 0 */
const fs = require('fs');

// Read data from text file, format for processing
const data = fs.readFileSync('scripts/totals/totals.txt').toString().split('\n');
const formattedData = data
  .filter(item => item)
  .map((item) => {
    const replacement = item
      .replace(/\s/g, '')
      .split('-');
    replacement[1] = parseInt(replacement[1], 10);
    return replacement;
  });

// Sum totals from duplicate usernames
const counts = {};
formattedData.forEach((item) => {
  if (counts[item[0]]) {
    const sum = counts[item[0]] + item[1];
    counts[item[0]] = sum;
  } else {
    counts[item[0]] = item[1]; // eslint-disable-line prefer-destructuring
  }
});

// Sort results, order from most duplicates to fewest
const sortedResults = [];
Object.keys(counts).forEach((item) => {
  sortedResults.push([item, counts[item]]);
});

sortedResults
  .sort((a, b) => a[1] - b[1])
  .reverse();

console.log('');
console.log('Season Totals:');
console.log('-------------');
sortedResults.forEach(result => console.log(`${result[0]} - ${result[1]}`));
