module.exports = function (plugin, ConfigError) {
    // validate receive plugin interface
    var methods = ['init', 'isMatch', 'exists', 'read'];

    for (var i in methods) {
        var method = methods[i];

        if (typeof plugin[method] !== 'function') {
            throw ConfigError.createError(
                ConfigError.CODES.INVALID_PLUGIN,
                'maf-config: receive plugin type:  method "' + method + '" not exists'
            );
        }
    }
};
