module.exports = function(plugin, ConfigError) {
    // validate receive plugin interface
    let props = {
        'name': 'string',
        'init': 'function',
        'isMatch': 'function',
        'read': 'function'
    };

    Object.keys(props).forEach((name) => {
        let type = props[name];

        if (typeof plugin[name] !== type) {
            throw ConfigError.createError(
                ConfigError.CODES.INVALID_PLUGIN,
                'maf-config: receive plugin type:  prop "' + name + '" is not ' + type
            );
        }
    });
};
