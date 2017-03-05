var kindOf = require('../../modules/kind-of');

module.exports = function (config, ConfigError, founded) {
    var promises = [];

    for (var j in founded) {

        var sourcePlugin = founded[j].plugin;

        var sourceFrom = founded[j].from;

        config._debug('receive: read ' + sourceFrom.sourcepath);

        var promise = sourcePlugin.read(sourceFrom.sourcepath);

        if (
            !promise ||
            kindOf(promise.then) !== 'function' ||
            kindOf(promise.catch) !== 'function'
        ) {
            throw ConfigError
                .createError(ConfigError.CODES.INVALID_PLUGIN_READ)
                .bind({
                    name: sourcePlugin.name
                });
        }

        promises.push(promise);
    }

    return promises;
};
