var t = require('tap');

var Config = require('../../../package/Config.js');

t.test('should clone full config', function (t) {
    var config = new Config();

    var data = {
        test: 100500
    };

    config.set('.', data);

    var newConfig = config.clone();

    t.same(newConfig.get('.'), data);

    var newConfig2 = config.clone('.');

    t.same(newConfig2.get('.'), data);

    t.end();
});

t.test('should clone config partly', function (t) {
    var config = new Config();

    var data = {
        server: {
            host: null,
            port: 8080
        },
        rest: {
            endpoint: '/api/v0'
        }
    };

    config.set('.', data);

    var serverConfig = config.clone('server');

    var restConfig = config.clone('rest');

    t.same(serverConfig.get('.'), data.server);
    t.same(restConfig.get('.'), data.rest);

    t.end();
});

t.test('should transfer immutable flag to cloned config', function (t) {

    var config = new Config();

    config.set('.', {test: 100500});

    config.setImmutable(true);

    t.true(config.isImmutable());

    var newConfig = config.clone();

    t.true(newConfig.isImmutable());

    t.end();
});
