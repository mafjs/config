let _get = require('lodash.get');

// var _clone = require('lodash.clonedeep');

let kindOf = require('../modules/kind-of');

let ConfigError = require('../Error');

let _in = require('./_in');

let _clone = function(value) {
    let valueType = kindOf(value);

    if (_in(['object', 'array'], valueType)) {
        return JSON.parse(JSON.stringify(value));
    }

    return value;
};

module.exports = function(config, name, defaultValue) {
    config._debug(
        'get: name = ', name,
        'defaultValue = ', defaultValue
    );

    let typeOfName = kindOf(name);

    config._debug('get: typeOf name = ', typeOfName);

    if (_in(['string', 'array'], typeOfName) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'get',
            arg: 'name',
            type: 'string, array'
        });
    }

    if (typeOfName === 'string') {
        name = name.trim();
    }

    let typeOfDefaultValue = kindOf(defaultValue);

    config._debug('get: typeOf value = ', typeOfDefaultValue);

    let valueTypes = ['undefined', 'null', 'array', 'string', 'number', 'object', 'boolean'];

    if (_in(valueTypes, typeOfDefaultValue) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'set',
            arg: 'value',
            type: 'undefined, null, array, string, number, object, boolean'
        });
    }

    let value;

    if (name === '.') {
        value = config._data;
        config._debug('get: name == \'.\' return full config object');
    } else {
        config._debug('get: call lodash.get ' + name);
        value = _get(config._data, name, defaultValue);
    }

    config._debug('get: return value', value);

    return _clone(value);
};
