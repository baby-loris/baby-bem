var path = require('path');

module.exports = {
    port: process.env.PORT,
    socket: '/tmp/{directory}-{username}.socket'
        .replace('{directory}', path.basename(process.cwd()))
        .replace('{username}', process.env.USER),

    cluster: {
        workers: 1,
        timeout: 1
    }
};
