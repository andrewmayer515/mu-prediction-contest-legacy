const CONSTANTS = require('../src/common/constants');

const results = {
  question1: {
    text: 'Total Game Points:',
    answer: 167,
    type: CONSTANTS.NUMBER,
  },
  question2: {
    text: 'MU Points:',
    answer: 89,
    type: CONSTANTS.NUMBER,
  },
  question3: {
    text: 'Opponent Points:',
    answer: 78,
    type: CONSTANTS.NUMBER,
  },
  question4: {
    text: 'TO\'s forced by MU:',
    answer: 10,
    type: CONSTANTS.NUMBER,
  },
  question5: {
    text: 'TO\'s forced by Opponent:',
    answer: 9,
    type: CONSTANTS.NUMBER,
  },
  question6: {
    text: 'MU total made 3s:',
    answer: 3,
    type: CONSTANTS.NUMBER,
  },
  question7: {
    text: 'MU top scorer and how many:',
    answer: {
      player: [CONSTANTS.ROSTER.VANDER_BLUE],
      number: 18,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  question8: {
    text: 'MU top assist man and how many:',
    answer: {
      player: [CONSTANTS.ROSTER.JUNIOR_CADOUGAN],
      number: 6,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  question9: {
    text: 'MU top rebounder and how many:',
    answer: {
      player: [CONSTANTS.ROSTER.CHRIS_OTULE, CONSTANTS.ROSTER.JUNIOR_CADOUGAN],
      number: 5,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  question10: {
    text: 'MU top 3-point shooter and how many:',
    answer: {
      player: [CONSTANTS.ROSTER.JAMIL_WILSON],
      number: 2,
    },
    type: CONSTANTS.PLAYER_NUMBER,
  },
  bonus: {
    answer: 56.4,
    type: CONSTANTS.NUMBER,
    text: 'Predict Marquette\'s shooting percentage:',
  },
  url: 'https://www.muscoop.com/index.php?topic=35990.0;all',
};

module.exports = {
  results,
};
