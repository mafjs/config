var t = require('tap');

var Config = require('../../../package/Config');
var ConfigError = require('../../../package/Error');

t.test('created object should has Error property instanceof ConfigError', function (t) {

    var config = new Config();

    t.same(config.Error, ConfigError);

    t.end();
});
