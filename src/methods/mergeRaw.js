let _merge = require('lodash.merge');

let kindOf = require('../modules/kind-of');

let ConfigError = require('../Error');

let _in = require('./_in');

module.exports = function(config, source) {
    config._debug('mergeRaw: source = ', source);

    let typeOfSource = kindOf(source);

    config._trace('mergeRaw: typeOf source = ', typeOfSource);

    if (_in(['object', 'array'], typeOfSource) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'mergeRaw',
            arg: 'source',
            type: 'object, array'
        });
    }

    let data = _merge(config._data, source);

    config.setRaw('.', data);

    return config;
};
