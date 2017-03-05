module.exports = function (plugin, ConfigError) {
    // validate receive plugin interface
    var props = {
        'name': 'string',
        'init': 'function',
        'isMatch': 'function',
        'read': 'function'
    };

    for (var name in props) {
        var type = props[name];

        if (typeof plugin[name] !== type) {
            throw ConfigError.createError(
                ConfigError.CODES.INVALID_PLUGIN,
                'maf-config: receive plugin type:  prop "' + name + '" is not ' + type
            );
        }
    }
};
