let t = require('tap');

let proxyquire = require('proxyquire');

t.test('should call receive method function', function(t) {
    let Config = proxyquire('../../../package/Config.js', {
        './methods/receive': function() {
            t.end();
        }
    });

    let config = new Config();

    config.receive();
});
