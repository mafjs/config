var _set = require('lodash.set');

var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

var _in = require('./_in');

module.exports = function (config, name, value) {

    config._debug(
        'set: name = ', name,
        'value = ', value,
        '_immutable = ', config._immutable
    );

    if (config._immutable === true) {
        throw new ConfigError(ConfigError.CODES.IMMUTABLE);
    }

    var typeOfName = kindOf(name);

    config._debug('set: typeOf name = ', typeOfName);

    var nameTypes = ['string', 'array'];

    if (_in(nameTypes, typeOfName) === false) {

        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'set',
            arg: 'name',
            type: 'string, array'
        });

    }

    var typeOfValue = kindOf(value);

    config._debug('set: typeOf value = ', typeOfValue);

    var valueTypes = ['null', 'array', 'string', 'number', 'object', 'boolean'];

    if (_in(valueTypes, typeOfValue) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'set',
            arg: 'value',
            type: 'null, array, string, number, object, boolean'
        });
    }

    _set(config._data, name, value);

    return config;
};
