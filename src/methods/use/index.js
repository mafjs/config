let ConfigError = require('../../Error');

let validateReceivePlugin = require('./validateReceivePlugin');

module.exports = function(config, Plugin, options) {
    config._debug('use: create instance of Plugin');

    let plugin;

    try {
        plugin = new Plugin(config._logger);
        config._debug('use: plugin type', plugin.type);
    } catch (error) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_PLUGIN, error);
    }

    switch (plugin.type) {
        case 'receive':

            config._debug('use: create plugin instance of receive type');

            validateReceivePlugin(plugin, ConfigError);

            config._debug('use: init receive plugin ' + plugin.name);

            plugin.init(options);

            config._receivePlugins.push(plugin);

            break;
        default:
            throw ConfigError
                .createError(ConfigError.CODES.INVALID_PLUGIN_TYPE)
                .bind({type: plugin.type});
    }

    return config;
};
