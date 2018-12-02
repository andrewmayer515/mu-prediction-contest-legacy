module.exports = {
  preset: 'jest-puppeteer',
  modulePathIgnorePatterns: [
    '<rootDir>/lib/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
