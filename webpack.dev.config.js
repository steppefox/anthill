var path    = require('path');
var webpack = require('webpack');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path:     path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:   /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader!postcss-loader"),
      },
      {
        test:    /\.jsx?$/,
        exclude: /(node_modules|web)/,
        loaders: [
          'react-hot',
          'babel'
        ]
      }
    ]
  },
  plugins: (function(){
    var plugins = [
      new ExtractTextPlugin('[name].css')
    ];
    plugins.push(new webpack.HotModuleReplacementPlugin());
    return plugins;
  })(),
  postcss: function () {
    return [precss, autoprefixer, cssnano];
  }
}
