'use strict';
require('babel/register')({});
var env = process.env.NODE_ENV || 'dev';
var app = require('./server');
var PORT = process.env.PORT || 3000;

var webpack = require('webpack');
var webpackConfig;
if (env == 'production') {
	webpackConfig = require('../webpack.prod.config');
} else {
	webpackConfig = require('../webpack.dev.config');
}
var webpackCompiler = webpack(webpackConfig);

app.set('env', env);
app.enable('trust proxy');
app.disable('etag');
app.disable('x-powered-by');

if (env == 'production') {
	webpackCompiler.run(function(err, stats) {
		if (err) {
			return console.log(err);
		}
	});
} else {
	var WebpackDevServer = require('webpack-dev-server');
	new WebpackDevServer(webpackCompiler, {
		publicPath: webpackConfig.output.publicPath,
		filename: webpackConfig.output.filename,
		hot: true,
		historyApiFallback: true,
		proxy: {
			'*': 'http://127.0.0.1:' + (process.env.PORT || 3000) // прокидывать все дальнейшие запросы на бекенд
		},
		quiet: true,
		stats: { colors: true },
	}).listen(8080, '127.0.0.1', function (err, result) {
		if (err) {
			return console.log(err);
		}

		console.log('Webpack listening at http://localhost:8080/');
	});
}


app.listen(PORT, function () {
  	console.log('Node-server listening on', PORT);
});

