var t = require('tap');
var proxyquire = require('proxyquire');

var root = '../../../..';

var ConfigError = require(root + '/package/Error.js');

var createConfigStub = function () {
    return {
        _from: [],
        _receivePlugins: [],
        _debug: function () {
            // console.log.apply(console, arguments);
        },

        set: function () {

        }
    };
};

t.test('#receive should return promise', function (t) {
    var config = createConfigStub();

    var receive = proxyquire(root + '/package/methods/receive', {});

    var promise = receive(config);

    t.type(promise.then, 'function');
    t.type(promise.catch, 'function');

    t.end();
});


t.test('#receive should success if _from.length === 0', function (t) {
    var config = createConfigStub();

    var receive = proxyquire(root + '/package/methods/receive', {});

    var promise = receive(config);

    return promise.then(function () {
        t.end();
    });

});

t.test('#receive should call isMatch and read for receive plugins', function (t) {
    var config = createConfigStub();

    var receive = proxyquire(root + '/package/methods/receive', {});

    var Plugin1 = function () {
        this.type = 'receive';
        this.name = 'plugin1';
    };

    var isMatchCalled = false;

    Plugin1.prototype.isMatch = function (/* sourcepath */) {
        isMatchCalled = true;
        return true;
    };

    var readCalled = false;

    Plugin1.prototype.read = function (/* sourcepath */) {

        return new Promise(function (resolve) {
            readCalled = true;
            resolve({});
        });

    };

    var Plugin2 = function () {
        this.type = 'receive';
        this.name = 'plugin2';
    };


    Plugin2.prototype.isMatch = function (/* sourcepath */) {
        return false;
    };

    Plugin2.prototype.read = function () {

        return new Promise(function (resolve) {
            resolve();
        });

    };

    config._receivePlugins.push(new Plugin2());
    config._receivePlugins.push(new Plugin1());

    config._from.push({sourcepath: './test.json', to: '.'});

    receive(config)
        .then(function () {
            t.ok(isMatchCalled, 'Plugin.isMatch not called');
            t.ok(readCalled, 'Plugin.read not called');
            t.end();
        })
        .catch(function (error) {
            t.threw(error);
        });
});



t.test('#receive should set data with config.set function after receive', function (t) {
    var config = createConfigStub();

    config.set = function (name, value) {
        t.equal(name, '.');
        t.same(value, {a: 1, b: 2});
        t.end();
    };

    var receive = proxyquire(root + '/package/methods/receive', {});

    var Plugin1 = function () {
        this.type = 'receive';
        this.name = 'plugin1';
    };

    Plugin1.prototype.isMatch = function (/* sourcepath */) {
        return true;
    };

    Plugin1.prototype.read = function (/* sourcepath */) {

        return new Promise(function (resolve) {
            resolve({a: 1, b: 2});
        });

    };

    config._receivePlugins.push(new Plugin1());

    config._from.push({sourcepath: './test.json', to: '.'});

    receive(config);
});


t.test('#receive should reject error if receive plugin not found for sourcepath', function (t) {
    var config = createConfigStub();

    config._from.push({sourcepath: './test.json', to: '.'});

    var receive = proxyquire(root + '/package/methods/receive', {});

    receive(config)
        .then(function () {
            t.threw(new Error('should reject error'));
        })
        .catch(function (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.UNKNOWN_SOURCE_TYPE);
            t.end();
        });
});


t.test('#receive should reject error, if receive plugin read method return not promise', function (t) {
    var config = createConfigStub();

    config._from.push({sourcepath: './test.json', to: '.'});

    var Plugin1 = function () {
        this.type = 'receive';
        this.name = 'plugin1';
    };

    Plugin1.prototype.isMatch = function (/* sourcepath */) {
        return true;
    };

    Plugin1.prototype.read = function (/* sourcepath */) {
        return null;
    };

    config._receivePlugins.push(new Plugin1());

    var receive = proxyquire(root + '/package/methods/receive', {});

    receive(config)
        .then(function () {
            t.threw(new Error('should reject error'));
        })
        .catch(function (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.INVALID_PLUGIN_READ);
            t.end();
        });

});


t.test('#receive should reject error, if receive plugin fail on read', function (t) {
    var config = createConfigStub();

    config._from.push({sourcepath: './test.json', to: '.'});

    var Plugin1 = function () {
        this.type = 'receive';
        this.name = 'plugin1';
    };

    Plugin1.prototype.isMatch = function (/* sourcepath */) {
        return true;
    };

    Plugin1.prototype.read = function (/* sourcepath */) {

        return new Promise(function (resolve, reject) {
            reject(new Error('no connection'));
        });

    };

    config._receivePlugins.push(new Plugin1());

    var receive = proxyquire(root + '/package/methods/receive', {});

    receive(config)
        .then(function () {
            t.threw(new Error('should reject error'));
        })
        .catch(function (error) {
            t.ok(error instanceof ConfigError);
            t.equal(error.code, ConfigError.CODES.FAILED_TO_READ_SOURCE);
            t.end();
        });
});
