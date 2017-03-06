var t = require('tap');

var proxyquire = require('proxyquire');

var root = '../../../..';

var ConfigError = require(root + '/package/Error.js');

var use = require(root + '/package/methods/use');

var createConfigStub = function () {

    return {
        _data: {},
        _receivePlugins: [],
        _validatePlugin: null,
        _debug: function () {
            // console.log.apply(console, arguments);
        }
    };

};

t.test('#use should throw error if plugin is not constructor', function (t) {
    var config = createConfigStub();

    try {
        use(config, {});
    } catch (error) {
        t.ok(error instanceof ConfigError);
        t.equal(error.code, ConfigError.CODES.INVALID_PLUGIN);
        t.end();
    }

});

t.test('#use recieve plugin type', function (t) {

    t.test('#use should add plugin without errors', function (t) {
        var config = createConfigStub();

        var Plugin = function (logger) {
            this.type = 'receive';
            this.name = 'test';
            t.same(logger, config._logger);
        };

        Plugin.prototype.init = function () {};
        Plugin.prototype.isMatch = function () {};
        Plugin.prototype.read = function () {};

        t.equal(config._receivePlugins.length, 0);

        var result = use(config, Plugin, {a: 1});

        t.same(result, config);

        t.equal(config._receivePlugins.length, 1);

        t.end();
    });

    t.test('#use should pass options to init plugin method', function (t) {
        var config = createConfigStub();

        var Plugin = function (logger) {
            this.type = 'receive';
            this.name = 'test';
            t.same(logger, config._logger);
        };

        Plugin.prototype.init = function (options) {
            t.same(options, {a: 1});
            t.end();
        };
        Plugin.prototype.isMatch = function () {};
        Plugin.prototype.read = function () {};

        use(config, Plugin, {a: 1});
    });

    t.test('#use should throw error INVALID_PLUGIN_TYPE if plugin type undefined', function (t) {
        var config = createConfigStub();

        var invalidPlugins = [];

        var PluginWithoutType = function () {};

        invalidPlugins.push(PluginWithoutType);

        var count = 0;

        var done = function () {
            count++;
            if (count === invalidPlugins.length) {
                t.end();
            }
        };

        for (var i in invalidPlugins) {
            var plugin = invalidPlugins[i];

            try {
                use(config, plugin);
                t.threw(new Error('no error thrown for invalid plugin type'));
            } catch (error) {
                t.ok(error instanceof ConfigError);
                t.equal(error.code, ConfigError.CODES.INVALID_PLUGIN_TYPE);
                done();
            }

        }
    });

    t.test('#use should throw error INVALID_PLUGIN if plugin interface invalid', function (t) {
        var config = createConfigStub();

        var invalidPlugins = [];

        var PluginWithoutName = function () {
            this.type = 'receive';
            this.name = 'test';
        };

        invalidPlugins.push(PluginWithoutName);

        var PluginWithoutAnyMethods = function () {
            this.type = 'receive';
        };

        invalidPlugins.push(PluginWithoutAnyMethods);

        var createPlugin = function (methods) {

            var Plugin = function () {
                this.type = 'receive';
                this.name = 'test_' + methods.join('_');
            };

            for (var i in methods) {
                Plugin.prototype[methods[i]] = function () {};
            }

            return Plugin;

        };

        invalidPlugins.push(createPlugin(['init']));
        invalidPlugins.push(createPlugin(['init', 'isMatch']));
        invalidPlugins.push(createPlugin(['init', 'read']));


        var count = 0;

        var done = function () {
            count++;
            if (count === invalidPlugins.length) {
                t.end();
            }
        };

        for (var i in invalidPlugins) {
            var plugin = invalidPlugins[i];

            try {
                use(config, plugin);
                t.threw(new Error('no error thrown for invalid plugin'));
            } catch (error) {
                t.ok(error instanceof ConfigError);
                t.equal(error.code, ConfigError.CODES.INVALID_PLUGIN);
                done();
            }

        }
    });

    t.end();
});
