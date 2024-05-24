module.exports = {
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  setupFilesAfterEnv: ['./node_modules/jest-puppeteer-react/setup'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  }
};
