var path = require('path');
var recluster = require('recluster');
var debug = require('debug')('{{ProjectName}}:boot');

var cluster = recluster(path.join(__dirname, 'app.js'), {
    workers: process.env.CLUSTER_WORKERS || 2,
    timeout:  process.env.CLUSTER_TIMEOUT || 60
});
cluster.run();

/**
 * @see https://github.com/doxout/recluster#usage
 */
process.on('SIGUSR2', function () {
    debug('Reloading cluster...');
    cluster.reload();
});
