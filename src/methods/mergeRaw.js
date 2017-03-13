var _merge = require('lodash.merge');

var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

var _in = require('./_in');

module.exports = function (config, source) {
    config._debug('mergeRaw: source = ', source);

    var typeOfSource = kindOf(source);

    config._trace('mergeRaw: typeOf source = ', typeOfSource);

    if (_in(['object', 'array'], typeOfSource) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'mergeRaw',
            arg: 'source',
            type: 'object, array'
        });
    }

    var data = _merge(config._data, source);

    config.setRaw('.', data);

    return config;
};
