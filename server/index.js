'use strict';

require('babel-register');
require('babel-polyfill');

// Dirty hack
require.extensions['.css'] = function () { return { 'default': {} }; };
require.extensions['.svg'] = function (module, filename) {
	module.exports = '#' + filename.split('/').pop().split('.').shift();
};

var env = process.env.NODE_ENV || 'dev';
var app = require('./server').default;
var PORT = process.env.PORT || 3000;
var webpack = require('webpack');
var webpackConfig;
if (env == 'production') {
	webpackConfig = require('../webpack.prod.config');
} else {
	webpackConfig = require('../webpack.dev.config');
}
var webpackCompiler = webpack(webpackConfig);

if (env == 'production') {

} else {
	var WebpackDevServer = require('webpack-dev-server');
	new WebpackDevServer(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		filename: webpackConfig.output.filename,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'*': 'http://127.0.0.1:' + PORT // прокидывать все дальнейшие запросы на бекенд
		},
		quiet: false,
		stats: { colors: true },
	}).listen(8080, '127.0.0.1', function (err, result) {
		if (err) {
			return console.log('Webpack Error', err);
		}

		console.log('Webpack listening at http://localhost:8080/');
	});
}


app.listen(PORT, function (err, result) {
  	console.log('Node-server listening on', PORT);

	if (err) {
		console.warn('NodeServer error', err);
	}
});

