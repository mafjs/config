let t = require('tap');

let Config = require('../../../package/Config.js');

t.test('should clone full config', function(t) {
    let config = new Config();

    let data = {
        test: 100500
    };

    config.set('.', data);

    let newConfig = config.clone();

    t.same(newConfig.get('.'), data);

    let newConfig2 = config.clone('.');

    t.same(newConfig2.get('.'), data);

    t.end();
});

t.test('should clone config partly', function(t) {
    let config = new Config();

    let data = {
        server: {
            host: null,
            port: 8080
        },
        rest: {
            endpoint: '/api/v0'
        }
    };

    config.set('.', data);

    let serverConfig = config.clone('server');

    let restConfig = config.clone('rest');

    t.same(serverConfig.get('.'), data.server);
    t.same(restConfig.get('.'), data.rest);

    t.end();
});

t.test('should transfer immutable flag to cloned config', function(t) {
    let config = new Config();

    config.set('.', {test: 100500});

    config.setImmutable(true);

    t.true(config.isImmutable());

    let newConfig = config.clone();

    t.true(newConfig.isImmutable());

    t.end();
});
