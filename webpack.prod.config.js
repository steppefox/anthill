var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:  [
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
                loaders: [
                    'react-hot',
                    'babel'
                ]
            },
            {
                test:   /\.css$/,
                loader: extractCSS.extract(["style-loader", "css-loader", "postcss-loader"]),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    postcss: function () {
        return [precss, autoprefixer, cssnano];
    }
}
