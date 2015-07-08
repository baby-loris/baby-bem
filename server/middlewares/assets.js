if (process.env.NODE_ENV === 'development') {
    var express = require('express');
    var enbServerMiddleware = require('enb/lib/server/server-middleware');

    module.exports = express.Router()
        .use(enbServerMiddleware.createMiddleware({noLog: true}))
        .use('/client', express.static(__dirname + '/../../client'))
        .use('/node_modules', express.static(__dirname + '/../../node_modules'))
        .use('/tests/client', express.static(__dirname + '/../../tests/client'));
} else {
    // if you want to serve static files by express application,
    // make sure that you add the extra route here
    module.exports = function (req, res, next) {
        next();
    };
}
