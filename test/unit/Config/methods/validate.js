var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../..';

var ConfigError = require(root + '/package/Error.js');

var createConfigStub = function () {
    return {
        _immutable: false,
        _data: {},
        _valid: false,
        _validation: null,
        _debug: function () {
            // console.log.apply(console, arguments);
        }
    };
};

t.test('#validate should return Promise', function (t) {
    var config = createConfigStub();

    var validate = proxyquire(root + '/package/methods/validate', {});

    var promise = validate(config);

    t.type(promise.then, 'function');
    t.type(promise.catch, 'function');

    t.end();
});


t.test('#validate should resolve promise, if no validation function', function (t) {
    var config = createConfigStub();

    var validate = proxyquire(root + '/package/methods/validate', {});

    return validate(config).then(function () {
        t.ok(config._valid);
        t.end();
    });

});


t.test('#validate should reject error if validation function return not promise', function (t) {
    var config = createConfigStub();

    config._validation = function () {
        return true;
    };

    var validate = proxyquire(root + '/package/methods/validate', {});

    validate(config)
        .then(function () {
            t.threws(new Error('should reject error'));
        })
        .catch(function (error) {
            t.notOk(config._valid);
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.INVALID_VALIDATION_FUNCTION);
            t.end();
        });

});

t.test('#validate should resolve promise, if validation function promise resolved', function (t) {
    var config = createConfigStub();

    config._validation = function () {

        return new Promise(function (resolve) {
            resolve({a: 1, b: 2});
        });

    };

    var validate = proxyquire(root + '/package/methods/validate', {});

    return validate(config).then(() => {
        t.same(config._data, {a: 1, b: 2});
        t.ok(config._valid);
        t.end();
    });

});


t.test('#validate should reject promise, if validation function promise rejected', function (t) {
    var config = createConfigStub();

    config._validation = function () {

        return new Promise(function (resolve, reject) {
            reject(new Error('test'));
        });

    };

    var validate = proxyquire(root + '/package/methods/validate', {});

    return validate(config).catch(function (error) {
        t.notOk(config._valid);
        t.ok(error instanceof ConfigError);
        t.equal(error.code, ConfigError.CODES.INVALID_DATA);
        t.end();
    });

});
