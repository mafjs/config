var t = require('tap');

var proxyquire = require('proxyquire');

t.test('src/index should required src/Config', function (t) {

    var mock = function () {
        t.end();
    };

    mock['@globalRequire'] = true;

    var index = proxyquire('../../package/index', {
        './Config': mock
    });

    index();

});
