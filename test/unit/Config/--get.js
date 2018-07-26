let t = require('tap');

let proxyquire = require('proxyquire');

// var Config = require('../../../package/Config.js');

t.test('should call get method function', function(t) {
    let Config = proxyquire('../../../package/Config.js', {
        './methods/get': function(config, name, defaultValue) {
            t.same(name, '100');
            t.same(defaultValue, 500);
            t.end();
        }
    });

    let config = new Config();

    config.get('100', 500);
});

t.test('should return result of get method', function(t) {
    let Config = proxyquire('../../../package/Config.js', {
        './methods/get': function(/* config , name, defaultValue */) {
            return {a: 1};
        }
    });

    let config = new Config();

    t.same(config.get('100', 500), {a: 1});
    t.end();
});
