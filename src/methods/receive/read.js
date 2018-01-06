let kindOf = require('../../modules/kind-of');

module.exports = function(config, ConfigError, founded) {
    let promises = [];

    founded.forEach(({plugin: sourcePlugin, from: sourceFrom}, j) => {
        config._debug('receive: read ' + sourceFrom.sourcepath);

        let promise = sourcePlugin.read(sourceFrom.sourcepath);

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
    });

    return promises;
};
