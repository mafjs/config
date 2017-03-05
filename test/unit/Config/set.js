var t = require('tap');

var proxyquire = require('proxyquire');

t.test('should call set method function', function (t) {

    var mock = function (config, name, value) {
        t.same(name, '100');
        t.same(value, 500);
        t.end();
    };

    mock['@globalRequire'] = true;

    var Config = proxyquire('../../../package/Config.js', {
        './methods/set': mock
    });

    var config = new Config();

    config.set('100', 500);
});

t.test('should return result of set method', function (t) {
    var mock = function (config /*, name, defaultValue */) {
        return config;
    };

    mock['@globalRequire'] = true;

    var Config = proxyquire('../../../package/Config.js', {
        './methods/set': mock
    });

    var config = new Config();

    t.same(config.set('100', 500), config);
    t.end();
});
