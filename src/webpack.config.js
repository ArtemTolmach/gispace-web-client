const path = require('path');

module.exports = {
  entry: './src/index.js', // точка входа вашего приложения
  output: {
    path: path.resolve(__dirname, 'dist'), // каталог, куда webpack соберет ваше приложение
    filename: 'bundle.js' // имя собранного файла
  },
  module: {
    rules: [
      {
        test: /\.js$/, // применять правила только к .js файлам
        exclude: /node_modules/, // исключить node_modules из обработки
        use: {
          loader: 'babel-loader' // использовать babel-loader для обработки JavaScript
        }
      },
      {
        test: /\.css$/, // применять правила только к .css файлам
        use: ['style-loader', 'css-loader'] // использовать css-loader и style-loader для обработки CSS
      }
    ]
  }
};
