var express = require('express');

var config = require('../config');

if (config.devAssetServer) {
    var enbServerMiddleware = require('enb/lib/server/server-middleware');

    module.exports = express.Router()
        .use(enbServerMiddleware.createMiddleware())
        .use('/client', express.static(__dirname + '/../../client'))
        .use('/node_modules', express.static(__dirname + '/../../node_modules'))
        .use('/tests/client', express.static(__dirname + '/../../tests/client'));
} else {
    module.exports = function (req, res, next) {
        return next();
    };
}
