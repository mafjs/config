let searchReceivePlugin = require('./searchReceivePlugin');

module.exports = function(config, ConfigError) {
    let founded = [];

    config._from.forEach((from) => {
        config._debug('receive: search plugin for ', from.sourcepath);

        let plugin = searchReceivePlugin(config._receivePlugins, from.sourcepath);

        if (!plugin) {
            throw ConfigError
                .createError(ConfigError.CODES.UNKNOWN_SOURCE_TYPE)
                .bind({sourcepath: from.sourcepath});
        }

        config._debug('receive: found plugin "' + plugin.name + '" for "' + from.sourcepath + '"');

        founded.push({from: from, plugin: plugin});
    });

    return founded;
};
