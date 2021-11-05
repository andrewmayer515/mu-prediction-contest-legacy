import _has from 'lodash.has';
import _cloneDeep from 'lodash.clonedeep';
import levenshtein from 'fast-levenshtein';
import { ALIAS } from '../../../config/roster';

/**
 * Breaks apart player name to a an array of reasonable formats for a player name that someone
 * could guess. If the player was Vander Blue, the results would be:
 * ['vanderblue', 'vander', 'blue', 'vblue']
 * @param {*} players An array of player names, taken from the answer key of the current question
 */
export const reasonablePlayerGuesses = players => {
  const results = [];
  players.forEach(player => {
    const playerData = player.toLowerCase().split(' ');
    const initialLastName = `${playerData[0].charAt(0)}${playerData[1]}`;
    results.push(`${playerData[0]}${playerData[1]}`, playerData[0], playerData[1], initialLastName);

    // Allow a defined alias/nickname for a player set in constants
    if (_has(ALIAS, player)) {
      results.push(...ALIAS[player]);
    }
  });

  return results;
};

/**
 * Use the Levenshtein algorithm to match a guess with a player name (edit distance 2 or below)
 * @param {*} playerFormats An array of player names in different formats that someone could guess
 * @param {*} predictionPlayer The player name that the user guessed
 */
export const isMatchFound = (playerFormats, predictionPlayer) =>
  playerFormats.some(playerName => levenshtein.get(playerName, predictionPlayer) <= 2);

/**
 * Determines who guessed the correct player
 * @param {*} prediction The value that was guessed for a given question
 * @param {*} answer The value set in the config for the given question
 * @param {*} winnerData Comparison data on who the current winner is
 * @param {*} username Username for the person who made the guess
 * @param {*} isBonusQuestion Boolean for if the question being evaluated is the bonus question
 */
export default ({ prediction, answer, winnerData, username }) => {
  const predictionPlayer = prediction.replace(/[^a-z]/gi, '').toLowerCase();
  const playerFormats = reasonablePlayerGuesses(answer);

  // The player guess matches a reasonable result
  if (isMatchFound(playerFormats, predictionPlayer)) {
    // If this is blank (first time through or no correct player guess),
    // automatically return results
    if (!winnerData) {
      return {
        username: [username],
        prediction: `${answer}`,
      };
    }

    // Combine and return results
    const data = _cloneDeep(winnerData);
    data.username.push(username);
    return {
      username: data.username,
      prediction: `${answer}`,
    };
  }

  // No winner, return what was passed in
  return winnerData;
};
