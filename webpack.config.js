const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    // path: __dirname,
    filename: 'bundle.js',
    // library: 'yourLibName',
    // libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
    ]
  }
};
