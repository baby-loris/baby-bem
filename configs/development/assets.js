var express = require('express');
var enbServerMiddleware = require('enb/lib/server/server-middleware');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');
var enbBuilder = enbServerMiddleware.createBuilder();

module.exports = {

    /**
     * @returns {Object} Express application as middleware.
     */
    middleware: function () {
        return express.Router()
            .use(enbServerMiddleware.createMiddleware())
            .use('/client', express.static(__dirname + '/../../client'))
            .use('/node_modules', express.static(__dirname + '/../../node_modules'))
            .use('/tests/client', express.static(__dirname + '/../../tests/client'));
    },

    /**
     * @param {String} assetPath
     * @returns {Module} module
     */
    require: function (assetPath) {
        return enbBuilder(assetPath).then(function (fileName) {
            dropRequireCache(require, fileName);
            return require(fileName);
        });
    }
};
