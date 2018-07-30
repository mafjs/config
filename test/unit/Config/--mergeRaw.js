let t = require('tap');
let proxyquire = require('proxyquire');

let root = '../../..';

t.test('should call mergeRaw', function(t) {
    let data = {a: 1};


    let Config = proxyquire(root + '/package/Config', {
        './methods/mergeRaw': function(config, source) {
            t.same(source, data);
            t.end();
        }
    });

    let config = new Config();

    config.mergeRaw(data);
});
