var searchReceivePlugin = require('./searchReceivePlugin');

module.exports = function (config, ConfigError) {
    var founded = [];

    for (var i in config._from) {
        var from = config._from[i];

        config._debug('receive: search plugin for ', from.sourcepath);

        var plugin = searchReceivePlugin(config._receivePlugins, from.sourcepath);

        if (!plugin) {
            throw ConfigError
                .createError(ConfigError.CODES.UNKNOWN_SOURCE_TYPE)
                .bind({sourcepath: from.sourcepath});

        }

        config._debug('receive: found plugin "' + plugin.name + '" for "' + from.sourcepath + '"');

        founded.push({from: from, plugin: plugin});
    }

    return founded;
};
