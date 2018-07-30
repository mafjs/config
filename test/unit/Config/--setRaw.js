let t = require('tap');

let proxyquire = require('proxyquire');

t.test('should call set method function', function(t) {
    let Config = proxyquire('../../../package/Config.js', {
        './methods/setRaw': function(config, name, value) {
            t.same(name, '100');
            t.same(value, 500);
            t.end();
        }
    });

    let config = new Config();

    config.setRaw('100', 500);
});

t.test('should return result of set method', function(t) {
    let Config = proxyquire('../../../package/Config.js', {
        './methods/setRaw': function(config /* , name, defaultValue */) {
            return config;
        }
    });

    let config = new Config();

    t.same(config.setRaw('100', 500), config);
    t.end();
});
