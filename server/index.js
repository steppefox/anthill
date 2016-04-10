'use strict';

var env = process.env.NODE_ENV || 'development';

// Very important and dirty hack for NodeJS to make import 'some.css' and import 'some.svg' works in JS-files
require.extensions['.css'] = function () { return { 'default': {} }; };
require.extensions['.svg'] = function (module, filename) {
	module.exports = '#' + filename.split('/').pop().split('.').shift();
};

require('babel-polyfill');
// babel-register required to enable ES6 syntax in runtime (on the fly)
// in production, we will compile Server-code with Babel, to prevent slow runtime-parsing
if (env == 'development') {
	require('babel-register');
}

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

// Run WebPack DevServer to enable HotReload
// You can don't use it, and reload pages each time by your hands ;D
if (env == 'development') {
	var WebpackDevServer = require('webpack-dev-server');
	new WebpackDevServer(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		filename: webpackConfig.output.filename,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'*': 'http://127.0.0.1:' + PORT // proxy all requests to real Node server
		},
		quiet: true,
		stats: { colors: true },
	}).listen(8080, '127.0.0.1', function (err, result) {
		if (err) {
			return console.warn('Webpack Error', err);
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

