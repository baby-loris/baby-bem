var express = require('express');
var debug = require('debug')('{{ProjectName}}:app');

var app = express();

var assetsMiddleware = require('./middlewares/assets');
var buildPageMiddleware = require('./middlewares/build-page');
var langMiddleware = require('./middlewares/lang-detector');
var notFoundMiddleware = require('./middlewares/404');
var errorMiddleware = require('./middlewares/error');

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

var socket = process.env.SOCKET;
app.listen(socket, function () {
    debug('Listening on %s', socket);
});
