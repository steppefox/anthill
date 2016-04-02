var path    = require('path');
var webpack = require('webpack');

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
                loaders: ['react-hot', 'babel']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
