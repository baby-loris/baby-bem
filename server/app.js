var fs = require('fs');
var express = require('express');
var debug = require('debug')('{{ProjectName}}:app');

var app = express();
var env = require('../configs/current/env');

var assetsMiddleware = require('../configs/current/assets').middleware();
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

var portOrSocket = env.port || env.socket;
app.listen(portOrSocket, function () {
    debug('Listening on %s', portOrSocket);
    if (env.socket && !env.port) {
        fs.chmod(env.socket, '0777');
    }
});
