var debug = require('debug')('{{ProjectName}}:app');

module.exports = function (error, req, res, next) {
    /* jshint unused: vars */
    debug(error.stack);
    res.sendStatus(500);
};
