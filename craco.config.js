/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Router': path.resolve(__dirname, 'src/router'),
      '@So_on': path.resolve(__dirname, 'src/so_on'),
    }
  },
};