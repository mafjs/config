var t = require('tap');

var proxyquire = require('proxyquire');

t.test('should call use method function', function (t) {

    var mock = function (config, plugin, options) {
        t.same(plugin, {a: 1});
        t.same(options, {b: 2});
        t.end();
    };

    mock['@globalRequire'] = true;

    var Config = proxyquire('../../../package/Config.js', {
        './methods/use': mock
    });

    var config = new Config();

    config.use({a: 1}, {b: 2});
});
