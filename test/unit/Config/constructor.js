var t = require('tap');

var Config = require('../../../package/Config.js');
var ConfigError = require('../../../package/Error.js');

t.test('should create without errors', function (t) {
    new Config();

    t.end();
});

t.test('should create without errors when logger with debug method passed', function (t) {
    var logger = {
        debug: function () {},
        trace: function () {}
    };

    new Config(logger);

    t.end();
});


t.test('should throw error when logger has no debug method', function (t) {
    var logger = {};

    try {
        new Config(logger);
    } catch (error) {
        t.ok(error instanceof ConfigError);
        t.ok(error.code === ConfigError.CODES.INVALID_LOGGER);
        t.end();
    }

});

t.test('should throw error when logger has no trace method', function (t) {
    var logger = {debug: function () {}};

    try {
        new Config(logger);
    } catch (error) {
        t.ok(error instanceof ConfigError);
        t.ok(error.code === ConfigError.CODES.INVALID_LOGGER);
        t.end();
    }

});
