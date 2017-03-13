var t = require('tap');

var proxyquire = require('proxyquire');

t.test('should call receive method function', function (t) {

    var Config = proxyquire('../../../package/Config.js', {
        './methods/receive': function () {
            t.end();
        }
    });

    var config = new Config();

    config.receive();
});
