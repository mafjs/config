/* eslint-disable no-console */

let Config = require(__dirname + '/../package/Config');

let config = new Config();

config
    .set('.', {
        server: {
            host: null,
            port: 80
        },
        rest: {
            endpoint: '/api/v0'
        }
    })
    .setImmutable(false);

console.log('full config', config.get('.'));

let clonedConfig = config.clone('.');

console.log('clonedConfig', clonedConfig.get('.'));

let serverConfig = config.clone('server');

console.log('serverConfig immutable', serverConfig.isImmutable());

serverConfig.set('some', 1);

console.log('server config', serverConfig.get('.'));

let restConfig = config.clone('rest');

console.log('rest config', restConfig.get('.'));

/* eslint-enable no-console */
