import { TYPE } from '../src/common/constants';
import { ROSTER } from './roster';

export const results = {
  question1: {
    text: 'Total Game Points:',
    answer: 160,
    type: TYPE.NUMBER,
  },
  question2: {
    text: 'MU Points:',
    answer: 79,
    type: TYPE.NUMBER,
  },
  question3: {
    text: 'Opponent Points:',
    answer: 81,
    type: TYPE.NUMBER,
  },
  question4: {
    text: "TO's forced by MU:",
    answer: 8,
    type: TYPE.NUMBER,
  },
  question5: {
    text: "TO's forced by Opponent:",
    answer: 11,
    type: TYPE.NUMBER,
  },
  question6: {
    text: 'MU total made 3s:',
    answer: 8,
    type: TYPE.NUMBER,
  },
  question7: {
    text: 'MU top scorer and how many:',
    answer: {
      player: [ROSTER.SAM_HAUSER],
      number: 22,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  question8: {
    text: 'MU top assist man and how many:',
    answer: {
      player: [ROSTER.MARKUS_HOWARD],
      number: 4,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  question9: {
    text: 'MU top rebounder and how many:',
    answer: {
      player: [ROSTER.SAM_HAUSER],
      number: 9,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  question10: {
    text: 'MU top 3-point shooter and how many:',
    answer: {
      player: [ROSTER.SAM_HAUSER],
      number: 4,
    },
    type: TYPE.PLAYER_NUMBER,
  },
  bonus: {
    answer: 11,
    type: TYPE.NUMBER,
    text: '(2 points). Predict how many points MU scores in the first 5 minutes:',
    points: 2,
  },
  url: 'https://www.muscoop.com/index.php?topic=58228.0',
};
