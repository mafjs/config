var Config = require(__dirname + '/../package/Config');

var config = new Config();

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

var clonedConfig = config.clone('.');

console.log('clonedConfig', clonedConfig.get('.'));

var serverConfig = config.clone('server');

console.log('serverConfig immutable', serverConfig.isImmutable());

serverConfig.set('some', 1);

console.log('server config', serverConfig.get('.'));

var restConfig = config.clone('rest');

console.log('rest config', restConfig.get('.'));
