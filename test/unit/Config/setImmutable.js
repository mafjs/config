var t = require('tap');

var ConfigError = require('../../../package/Error.js');
var Config = require('../../../package/Config.js');


t.test('should mutable by default', function (t) {
    var config = new Config();

    t.ok(config._immutable === false);
    t.end();
});

t.test('should set immutable true', function (t) {
    var config = new Config();

    config.setImmutable(true);

    t.ok(config._immutable === true);
    t.end();
});


t.test('should set immutable false', function (t) {
    var config = new Config();

    config.setImmutable(true);
    config.setImmutable(false);

    t.ok(config._immutable === false);
    t.end();
});

t.test('should throw error if flag is not boolean', function (t) {
    var config = new Config();

    var types = [null, 'string', 100500, undefined, [1, 2, 3], {a: 1}, function () {}];

    var count = 0;

    var done = function () {
        count++;
        if (count === types.length) {
            t.end();
        }
    };

    for (var i in types) {
        var type = types[i];

        try {
            config.setImmutable(type);
            t.threw(new Error('no error thrown for type = ' + type));
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            done();
        }

    }

});
