var t = require('tap');

var ConfigError = require('../../../package/Error.js');
var Config = require('../../../package/Config.js');


t.test('should set validation function without errors', function (t) {
    var config = new Config();

    config.validation(function () {});

    t.end();
});

t.test('should throw error if validation function is not a function', function (t) {
    var config = new Config();

    var types = [null, 'string', 100500, undefined, [1, 2, 3], {a: 1}, undefined];

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
            config.validation(type);
            t.threw(new Error('no error thrown for type = ' + type));
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            done();
        }

    }
});
