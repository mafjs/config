let t = require('tap');

let proxyquire = require('proxyquire');

t.test('src/index should required src/Config', function(t) {
    let index = proxyquire('../../package/index', {
        './Config': function() {
            t.end();
        }
    });

    index();
});
