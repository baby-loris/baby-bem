var path = require('path');
var recluster = require('recluster');

var cluster = recluster(path.join(__dirname, 'app.js'), {
    workers: process.env.CLUSTER_WORKERS || 2,
    timeout:  process.env.CLUSTER_TIMEOUT || 60
});
cluster.run();
