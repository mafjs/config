let t = require('tap');

let Config = require('../../../package/Config');
let ConfigError = require('../../../package/Error');

t.test('created object should has Error property instanceof ConfigError', function(t) {
    let config = new Config();

    t.same(config.Error, ConfigError);

    t.end();
});
