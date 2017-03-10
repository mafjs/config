var _set = require('lodash.set');

var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

var _in = require('./_in');

module.exports = function (config, name, value) {

    config._debug(
        'setRaw: name = ', name,
        'value = ', value,
        '_immutable = ', config._immutable
    );

    if (config._immutable === true) {
        throw new ConfigError(ConfigError.CODES.IMMUTABLE);
    }

    var typeOfName = kindOf(name);

    config._debug('setRaw: typeOf name = ', typeOfName);

    var nameTypes = ['string', 'array'];

    if (_in(nameTypes, typeOfName) === false) {

        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'setRaw',
            arg: 'name',
            type: 'string, array'
        });

    }

    if (typeOfName === 'string') {
        name = name.trim();
    }

    var typeOfValue = kindOf(value);

    config._debug('setRaw: typeOf value = ', typeOfValue);

    if (name === '.') {
        config._data = value;
    } else {
        _set(config._data, name, value);
    }

    return config;
};
