const path = require('path');

module.exports = {
  entry: [
    './src/js/app.js'
  ],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /^(?!.*\.spec\.js$)(.*\.js$)|(.*\.jsx$)/, // *.js, *.jsx, but NOT *.spec.js 
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
