var fs = require('fs');
var express = require('express');
var debug = require('debug')('{{ProjectName}}:app');

var argv = require('./argv');
var config = require('./config');

var app = express();

var buildPageMiddleware = require('./middlewares/build-page');
var langMiddleware = require('./middlewares/lang-detector');
var notFoundMiddleware = require('./middlewares/404');
var errorMiddleware = require('./middlewares/error');

var assetsMiddleware = function (req, res, next) {
    return next();
};

if (config.devAssetServer) {
    var enbServerMiddleware = require('enb/lib/server/server-middleware');

    console.log(enbServerMiddleware);

    assetsMiddleware = express.Router()
        .use(enbServerMiddleware.createMiddleware())
        .use('/client', express.static(__dirname + '/../../client'))
        .use('/node_modules', express.static(__dirname + '/../../node_modules'))
        .use('/tests/client', express.static(__dirname + '/../../tests/client'));
}

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
