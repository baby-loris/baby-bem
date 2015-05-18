var fs = require('fs');
var express = require('express');
var debug = require('debug')('{{ProjectName}}:app');

var argv = require('./argv');
var config = require('./config');

var app = express();

var assetsMiddleware = require('./middlewares/assets');
var buildPageMiddleware = require('./middlewares/build-page');
var errorMiddleware = require('./middlewares/error');
var langMiddleware = require('./middlewares/lang-detector');
var notFoundMiddleware = require('./middlewares/404');

app
    .enable('trust proxy')
    .disable('x-powered-by')
    .get('/ping', function (req, res) {
        res.end();
    })
    .use(assetsMiddleware)
    .use(langMiddleware)
    .get('/', buildPageMiddleware('index'))
    .use(notFoundMiddleware)
    .use(errorMiddleware);

var socket = argv.socket || config.socket;
app.listen(socket, function () {
    debug('Listening on %s', socket);
    if (!Number(socket)) {
        fs.chmod(socket, '0777');
    }
});
