var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../..';

var ConfigError = require(root + '/package/Error.js');

var createConfigStub = function () {
    return {
        _immutable: false,
        _debug: function () {
            // console.log.apply(console, arguments);
        }
    };
};

t.test('base', function (t) {

    t.test('should set full config object on set(\'.\', value)', function (t) {
        var config = createConfigStub();

        var set = proxyquire(root + '/package/methods/set', {});

        set(config, '.', {a: 1, b: 2});

        t.same(config._data, {a: 1, b: 2});

        t.end();
    });


    t.test('should set null without errors', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, 'null');
                t.same(value, null);
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, 'null', null);

    });


    t.test('should set string without errors', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, 'string');
                t.same(value, 'string');
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, 'string', 'string');

    });


    t.test('should set number without errors', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, 'number');
                t.same(value, 100500);
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, 'number', 100500);

    });


    t.test('should set array without errors', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, 'array');
                t.same(value, [1, 2, 3]);
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, 'array', [1, 2, 3]);

    });


    t.test('should set object without errors', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, 'object');
                t.same(value, {a: 1, b: 2, c: {d: 3}});
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, 'object', {a: 1, b: 2, c: {d: 3}});

    });


    t.test('should set boolean without errors', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, 'boolean');
                t.same(value, true);
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, 'boolean', true);

    });


    t.test('should return this', function (t) {
        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        t.same(set(config, 'a', 'b'), config);
        t.end();
    });

    t.test('should throw error if config immutable', function (t) {

        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        config._immutable = true;

        try {
            set(config, 'name', 'val');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.IMMUTABLE);
            t.end();
        }

    });


    t.end();
});




// name arg tests

t.test('name arg', function (t) {

    t.test('should set value if name is array', function (t) {

        var set = proxyquire(root + '/package/methods/set', {
            'lodash.set': function (object, name, value) {
                t.same(name, ['test.a']);
                t.same(value, {a: 1, b: 2, c: {d: 3}});
                t.end();
            }
        });

        var config = createConfigStub();

        set(config, ['test.a'], {a: 1, b: 2, c: {d: 3}});
    });


    t.test('should throw error if name is null', function (t) {

        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        try {
            set(config, null, 'val');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            t.end();
        }

    });


    t.test('should throw error if name is number', function (t) {

        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        try {
            set(config, 100, 'val');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            t.end();
        }

    });


    t.test('should throw error if name is object', function (t) {

        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        try {
            set(config, {a: 1}, 'val');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            t.end();
        }

    });


    t.test('should throw error if name is function', function (t) {

        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        try {
            set(config, function () {}, 'val');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            t.end();
        }

    });



    t.test('should throw error if name is undefined', function (t) {

        var set = proxyquire(root + '/package/methods/set', {});

        var config = createConfigStub();

        try {
            var name;
            set(config, name, 'val');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.ok(error.code === ConfigError.CODES.INVALID_ARGS);
            t.end();
        }

    });


    t.end();
});





// value arg tests

t.test('value arg tests', function (t) {

    t.test('should set value if value valid', function (t) {

        // var valueTypes = ['null', 'array', 'string', 'number', 'object', 'boolean'];
        var types = [null, [1, 2, 3], '123', 100500, {a: 1}, true];

        var count = 0;

        var done = function () {
            count++;
            if (count === types.length) {
                t.end();
            }
        };

        for (var i in types) {
            var type = types[i];

            var config = createConfigStub();

            var mock = function (object, name, value) {
                t.same(value, type);
                done();
            };

            mock['@globalRequire'] = true;

            var set = proxyquire(root + '/package/methods/set', {
                'lodash.set': mock
            });

            set(config, 'test', type);

        }

    });


    t.test('should throw error if value invalid', function (t) {

        var types = [undefined, function () {}];

        var count = 0;

        var done = function () {
            count++;
            if (count === types.length) {
                t.end();
            }
        };

        for (var i in types) {
            var type = types[i];

            var config = createConfigStub();

            var set = proxyquire(root + '/package/methods/set', {});

            try {
                set(config, 'test', type);
            } catch (error) {
                t.ok(error instanceof ConfigError);
                t.equal(error.code, ConfigError.CODES.INVALID_ARGS);
                done();
            }

        }

    });

    t.end();
});
