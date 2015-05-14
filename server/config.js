var path = require('path');

var argv = require('./argv');

module.exports = require(path.resolve(process.cwd(), argv.config));
