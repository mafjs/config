var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../..';

t.test('should call mergeRaw', function (t) {

    var data = {a: 1};


    var Config = proxyquire(root + '/package/Config', {
        './methods/mergeRaw': function (config, source) {
            t.same(source, data);
            t.end();
        }
    });

    var config = new Config();

    config.mergeRaw(data);

});
