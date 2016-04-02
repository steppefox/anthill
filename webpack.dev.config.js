var path    = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path:     path.join(__dirname, 'web/dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'common'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
