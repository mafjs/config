var t = require('tap');

var Config = require('../../../package/Config.js');

t.test('#isValid should return valid state', function (t) {
    var config = new Config();

    t.notOk(config.isValid());

    return config.validate()
        .then(function () {
            t.ok(config.isValid());
            t.end();
        });

});
