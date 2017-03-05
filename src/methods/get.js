var _get = require('lodash.get');

// var _clone = require('lodash.clonedeep');

var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

var _in = require('./_in');

var _clone = function (value) {
    var valueType = kindOf(value);

    if (_in(['object', 'array'], valueType)) {
        return JSON.parse(JSON.stringify(value));
    }

    return value;
};

module.exports = function (config, name, defaultValue) {

    config._debug(
        'get: name = ', name,
        'defaultValue = ', defaultValue
    );

    var typeOfName = kindOf(name);

    config._debug('set: typeOf name = ', typeOfName);

    if (_in(['string', 'array'], typeOfName) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'get',
            arg: 'name',
            type: 'string, array'
        });
    }

    var typeOfDefaultValue = kindOf(defaultValue);

    config._debug('set: typeOf value = ', typeOfDefaultValue);

    var valueTypes = ['undefined', 'null', 'array', 'string', 'number', 'object', 'boolean'];

    if (_in(valueTypes, typeOfDefaultValue) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'set',
            arg: 'value',
            type: 'undefined, null, array, string, number, object, boolean'
        });
    }

    var value = _get(config._data, name, defaultValue);

    return _clone(value);
};
