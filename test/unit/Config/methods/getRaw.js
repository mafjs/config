var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../..';

var ConfigError = require(root + '/package/Error.js');

var createConfigStub = function () {
    return {
        _immutable: false,
        _data: {},
        _debug: function () {
            // console.log.apply(console, arguments);
        }
    };
};


// base tests
t.test('base', function (t) {


    t.test('should return full config object on get(\'.\')', function (t) {
        var config = createConfigStub();

        config._data = {
            a: 1,
            b: 2
        };

        var get = proxyquire(root + '/package/methods/getRaw', {});

        var value = get(config, '.');

        t.same(value, {a: 1, b: 2});

        t.end();
    });


    t.test('should return undefined if no param in config and no defaultValue set', function (t) {

        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {
            'lodash.get': function (object, name, defaultValue) {
                return defaultValue;
            }
        });

        var value = get(config, 'test');

        t.type(value, 'undefined');

        t.end();
    });



    t.test('should return param value, if config has param', function (t) {
        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {
            'lodash.get': function (/*object, name, defaultValue */) {
                return 'paramValue';
            }
        });

        var value = get(config, 'test');

        t.same(value, 'paramValue');

        t.end();
    });

    t.test('should not clone returned value', function (t) {

        var returnedValue = {
            a: 1,
            b: {
                c: 2
            }
        };

        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {
            'lodash.get': function (/*object, name, defaultValue */) {
                return returnedValue;
            }
        });

        var value = get(config, 'test');

        value.d = 3;
        value.b.c = 100500;
        value.b.f = 2000;

        t.same(returnedValue, {
            a: 1,
            b: {
                c: 100500,
                f: 2000
            },
            d: 3
        });

        t.same(value, {
            a: 1,
            b: {
                c: 100500,
                f: 2000
            },
            d: 3
        });
        t.end();
    });

    t.end();

});





// name arg tests

t.test('name arg', function (t) {

    t.test('should get without errors if name is string', function (t) {

        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {
            'lodash.get': function (/*object, name, defaultValue */) {
                return 'paramValue';
            }
        });

        var value = get(config, 'test');

        t.same(value, 'paramValue');

        t.end();

    });



    t.test('should get without errors if name is array', function (t) {

        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {
            'lodash.get': function (/*object, name, defaultValue */) {
                return 'paramValue';
            }
        });

        var value = get(config, ['test.a']);

        t.same(value, 'paramValue');

        t.end();
    });



    t.test('should throw error if name is not array or string', function (t) {

        var config = createConfigStub();

        var types = [null, 100500, undefined, {a: 1}, function () {}];

        var count = 0;

        var done = function () {
            count++;
            if (count === types.length) {
                t.end();
            }
        };

        var get = proxyquire(root + '/package/methods/getRaw', {});

        for (var i in types) {
            var type = types[i];

            try {
                get(config, type);
                t.threw(new Error('no error thrown for type = ' + type));
            } catch (error) {
                t.ok(error instanceof ConfigError);
                t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
                done();
            }

        }
    });

    t.end();
});




// defaultValue arg tests

t.test('defaultValue argument', function (t) {

    t.test('should return undefined if no config param and defaultValue undefined', function (t) {
        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {});

        var value = get(config, 'test');

        t.type(value, 'undefined');

        t.end();
    });


    t.test('should return defaultValue if no param in config and defaultValue defined', function (t) {

        var config = createConfigStub();

        var get = proxyquire(root + '/package/methods/getRaw', {
            'lodash.get': function (object, name, defaultValue) {
                return defaultValue;
            }
        });

        var value = get(config, 'test', 100500);

        t.same(value, 100500);

        t.end();
    });


    t.test('should get without errors for any default value', function (t) {

        var config = createConfigStub();

        // var validTypes = ['undefined', 'null', 'array', 'string', 'number', 'object', 'boolean'];
        var types = [undefined, null, [1, 2, 3], 'string', 100500, {a: 1}, true, function () {}];

        var count = 0;

        var done = function () {
            count++;
            if (count === types.length) {
                t.end();
            }
        };

        var get = proxyquire(root + '/package/methods/getRaw', {});

        for (var i in types) {
            var type = types[i];

            t.same(get(config, 'name', type), type);

            done();
        }
    });

    t.end();
});
