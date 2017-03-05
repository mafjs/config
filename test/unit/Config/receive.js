var t = require('tap');

var proxyquire = require('proxyquire');

t.test('should call receive method function', function (t) {

    var mock = function () {
        t.end();
    };

    mock['@globalRequire'] = true;

    var Config = proxyquire('../../../package/Config.js', {
        './methods/receive': mock
    });

    var config = new Config();

    config.receive();
});
