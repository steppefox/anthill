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
                loaders: [
                    'react-hot',
                    'babel?presets[]=es2015&presets[]=react&plugins[]=transform-object-rest-spread&plugins[]=transform-runtime'
                ]
            },
            {
                test:   /\.css$/,
                loader: extractCSS.extract(["style-loader", "css-loader", "postcss-loader"]),
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    postcss: function () {
        return [precss, autoprefixer, cssnano];
    }
}
