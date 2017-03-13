var t = require('tap');

var proxyquire = require('proxyquire');

t.test('src/index should required src/Config', function (t) {

    var index = proxyquire('../../package/index', {
        './Config': function () {
            t.end();
        }
    });

    index();

});
