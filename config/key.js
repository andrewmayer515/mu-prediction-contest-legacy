const CONSTANTS = require('../src/common/constants');

const results = {
  question1: {
    answer: 167,
    type: CONSTANTS.NUMBER,
  },
  question2: {
    answer: 89,
    type: CONSTANTS.NUMBER,
  },
  question3: {
    answer: 78,
    type: CONSTANTS.NUMBER,
  },
  question4: {
    answer: 10,
    type: CONSTANTS.NUMBER,
  },
  question5: {
    answer: 9,
    type: CONSTANTS.NUMBER,
  },
  question6: {
    answer: 3,
    type: CONSTANTS.NUMBER,
  },
  question7: {
    answer: {
      player: [CONSTANTS.ROSTER.VANDER_BLUE],
      number: 18,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  question8: {
    answer: {
      player: [CONSTANTS.ROSTER.JUNIOR_CADOUGAN],
      number: 6,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  question9: {
    answer: {
      player: [CONSTANTS.ROSTER.CHRIS_OTULE, CONSTANTS.ROSTER.JUNIOR_CADOUGAN],
      number: 5,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  question10: {
    answer: {
      player: [CONSTANTS.ROSTER.JAMIL_WILSON],
      number: 2,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  bonus: {
    answer: 56.4,
    type: CONSTANTS.NUMBER,
  },
  url: 'https://www.muscoop.com/index.php?topic=35990.0',
};

module.exports = {
  results,
};
