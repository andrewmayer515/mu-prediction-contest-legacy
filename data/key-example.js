const CONSTANTS = require('../src/common/constants');

const { ROSTER, TYPE } = CONSTANTS;
const results = {
  question1: {
    text: 'Total Game Points:',
    answer: 117,
    type: TYPE.NUMBER,
  },
  question2: {
    text: 'MU Points:',
    answer: 59,
    type: TYPE.NUMBER,
  },
  question3: {
    text: 'Opponent Points:',
    answer: 58,
    type: TYPE.NUMBER,
  },
  question4: {
    text: 'TO\'s forced by MU:',
    answer: 11,
    type: TYPE.NUMBER,
  },
  question5: {
    text: 'TO\'s forced by Opponent:',
    answer: 9,
    type: TYPE.NUMBER,
  },
  question6: {
    text: 'MU total made 3s:',
    answer: 4,
    type: TYPE.NUMBER,
  },
  question7: {
    text: 'MU top scorer and how many:',
    answer: {
      player: [ROSTER.VANDER_BLUE],
      number: 16,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  question8: {
    text: 'MU top assist man and how many:',
    answer: {
      player: [ROSTER.VANDER_BLUE, ROSTER.JAMIL_WILSON],
      number: 2,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  question9: {
    text: 'MU top rebounder and how many:',
    answer: {
      player: [ROSTER.CHRIS_OTULE],
      number: 5,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  question10: {
    text: 'MU top 3-point shooter and how many:',
    answer: {
      player: [ROSTER.JAMIL_WILSON, ROSTER.VANDER_BLUE],
      number: 2,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  bonus: {
    answer: 35,
    type: TYPE.NUMBER,
    text: 'Predict Marquette\'s shooting percentage:',
    points: 1,
  },
  url: 'https://www.muscoop.com/index.php?topic=37247.0;all',
};

module.exports = {
  results,
};
