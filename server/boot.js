var debug = require('debug')('{{ProjectName}}:boot');
var extend = require('extend');
var fs = require('fs');
var path = require('path');
var recluster = require('recluster');

var argv = require('./argv');
var config = require('./config');

var socket = argv.socket || config.socket;
if (!Number(socket) && fs.existsSync(socket)) {
    fs.unlinkSync(socket);
}

var cluster = recluster(
    path.join(__dirname, 'app.js'),
    extend(
        {args: process.argv.slice(2)},
        config.cluster
    )
);
cluster.run();

/**
 * @see https://github.com/doxout/recluster#usage
 */
process.on('SIGUSR2', function () {
    debug('Reloading cluster...');
    cluster.reload();
});
