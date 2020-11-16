module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    library: 'ImageSearch',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
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
