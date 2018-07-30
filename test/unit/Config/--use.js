let t = require('tap');

let proxyquire = require('proxyquire');

t.test('should call use method function', function(t) {
    let Config = proxyquire('../../../package/Config.js', {
        './methods/use': function(config, plugin, options) {
            t.same(plugin, {a: 1});
            t.same(options, {b: 2});
            t.end();
        }
    });

    let config = new Config();

    config.use({a: 1}, {b: 2});
});
