let t = require('tap');

let ConfigError = require('../../../package/Error.js');
let Config = require('../../../package/Config.js');


t.test('should set validation function without errors', function(t) {
    let config = new Config();

    config.validation(function() {});

    t.end();
});

t.test('should throw error if validation function is not a function', function(t) {
    let config = new Config();

    let types = [null, 'string', 100500, undefined, [1, 2, 3], {a: 1}, undefined];

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
            config.validation(type);
            t.threw(new Error('no error thrown for type = ' + type));
        } catch (error) {
            console.log(error);
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            done();
        }
    }
});
