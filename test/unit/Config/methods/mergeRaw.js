var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../..';

var ConfigError = require(root + '/package/Error.js');

var createConfigStub = function () {
    return {
        _data: {},
        _debug: function () {
            // console.log.apply(console, arguments);
        },
        _trace: function () {
            //
        },
        setRaw: function (/*name, data*/) {
            //
        }
    };
};
t.test('should call lodash.merge', function (t) {
    var config = createConfigStub();

    config._data = {
        a: 1,
        b: 2
    };

    var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {
        'lodash.merge': function (data, source) {
            t.same(data, {a: 1, b: 2});
            t.same(source, {c: 3});
            t.end();
        }
    });

    mergeRaw(config, {c: 3});

});

t.test('should call config.setRaw', function (t) {
    var config = createConfigStub();

    config.setRaw = function (name, data) {
        t.equal(name, '.');
        t.same(data, {a: 1, b: 2, c: 3});
        t.end();
    };

    var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {
        'lodash.merge': function () {
            return {a: 1, b: 2, c: 3};
        }
    });

    mergeRaw(config, {c: 3});
});

t.test('should return config object', function (t) {
    var config = createConfigStub();

    var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

    var result = mergeRaw(config, {c: 3});

    t.same(result, config);
    t.end();
});


t.test('source arg', function (t) {

    t.test('should success if source is object', function (t) {
        var config = createConfigStub();

        var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

        mergeRaw(config, {b: 2});

        t.same(config._data, {b: 2});
        t.end();
    });

    t.test('should success if source is array', function (t) {
        var config = createConfigStub();

        var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

        mergeRaw(config, [1, 2, 3]);

        t.same(config._data, [1, 2, 3]);
        t.end();
    });

    t.test('should throw ConfigError if source null', function (t) {
        var config = createConfigStub();

        var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

        try {
            mergeRaw(config, null);
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.INVALID_ARGS);
            t.end();
        }
    });

    t.test('should throw ConfigError if source string', function (t) {
        var config = createConfigStub();

        var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

        try {
            mergeRaw(config, '');
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.INVALID_ARGS);
            t.end();
        }
    });

    t.test('should throw ConfigError if source number', function (t) {
        var config = createConfigStub();

        var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

        try {
            mergeRaw(config, 100500);
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.INVALID_ARGS);
            t.end();
        }
    });

    t.test('should throw ConfigError if source function', function (t) {
        var config = createConfigStub();

        var mergeRaw = proxyquire(root + '/package/methods/mergeRaw', {});

        try {
            mergeRaw(config, function () {});
        } catch (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.INVALID_ARGS);
            t.end();
        }
    });


    t.end();
});
