module.exports = require('yargs')
    .options({
        c: {
            alias: 'config',
            default: 'configs/config.json',
            describe: 'Configuration file path',
            nargs: 1,
            type: 'string'
        },
        s: {
            alias: 'socket',
            describe: 'Socket the app will listen to',
            nargs: 1,
            type: 'string'
        }
    })
    .argv;
