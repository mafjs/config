let t = require('tap');

let Config = require('../../../package/Config.js');
let ConfigError = require('../../../package/Error');

t.test('#from should exec success without "to" param', function(t) {
    let config = new Config();

    let result = config.from('test');

    t.same(config._from[0], {sourcepath: 'test', to: '.'});
    t.same(result, config);

    t.end();
});

t.test('#from should exec success with "to" param', function(t) {
    let config = new Config();

    let result = config.from('test', 'db');

    t.same(config._from[0], {sourcepath: 'test', to: 'db'});
    t.same(result, config);

    t.end();
});

t.test('#from should throw error if sourcepath invalid', function(t) {
    let config = new Config();

    let types = [null, true, 100500, undefined, [1, 2, 3], {a: 1}, function() {}];

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
            config.from(type);
            t.threw(new Error('no error thrown for type = ' + type));
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            done();
        }
    }
});


t.test('#from should throw error if to value invalid', function(t) {
    let config = new Config();

    let types = [null, true, 100500, {a: 1}, function() {}];

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
            config.from('from', type);
            t.threw(new Error('no error thrown for type = ' + type));
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            done();
        }
    }
});
