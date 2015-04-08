var fs = require('fs');
var path = require('path');
var recluster = require('recluster');

var debug = require('debug')('{{ProjectName}}:boot');
var env = require('../configs/current/env');

try {
    fs.unlinkSync(env.socket);
} catch (error) {}

var cluster = recluster(path.join(__dirname, 'app.js'), env.cluster);
cluster.run();

/**
 * @see https://github.com/doxout/recluster#usage
 */
process.on('SIGUSR2', function () {
    debug('Reloading cluster...');
    cluster.reload();
});
