/* eslint-disable no-sequences */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

export const sortObject = o =>
  Object.keys(o)
    .sort((a, b) => {
      const compareA = a.replace('question', '');
      const compareB = b.replace('question', '');

      return compareA - compareB;
    })
    .reduce((r, k) => ((r[k] = o[k]), r), {});
