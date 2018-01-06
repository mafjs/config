let t = require('tap');

let ConfigError = require('../../../package/Error.js');
let Config = require('../../../package/Config.js');


t.test('should mutable by default', function(t) {
    let config = new Config();

    t.ok(config._immutable === false);
    t.end();
});

t.test('should set immutable true', function(t) {
    let config = new Config();

    config.setImmutable(true);

    t.ok(config._immutable === true);
    t.end();
});


t.test('should set immutable false', function(t) {
    let config = new Config();

    config.setImmutable(true);
    config.setImmutable(false);

    t.ok(config._immutable === false);
    t.end();
});

t.test('should throw error if flag is not boolean', function(t) {
    let config = new Config();

    let types = [null, 'string', 100500, undefined, [1, 2, 3], {a: 1}, function() {}];

    let count = 0;

    let done = function() {
        count++;
        if (count === types.length) {
            t.end();
        }
    };

    // eslint-disable-next-line guard-for-in
    for (let i in types) {
        let type = types[i];

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
