var _get = require('lodash.get');

var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

var _in = require('./_in');

module.exports = function (config, name, defaultValue) {

    config._debug(
        'getRaw: name = ', name,
        'defaultValue = ', defaultValue
    );

    var typeOfName = kindOf(name);

    config._debug('getRaw: typeOf name = ', typeOfName);

    if (_in(['string', 'array'], typeOfName) === false) {
        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'getRaw',
            arg: 'name',
            type: 'string, array'
        });
    }

    if (typeOfName === 'string') {
        name = name.trim();
    }

    var typeOfDefaultValue = kindOf(defaultValue);

    config._debug('getRaw: typeOf value = ', typeOfDefaultValue);

    var value;

    if (name === '.') {
        value = config._data;
        config._debug('getRaw: name == \'.\' return full config object');
    } else {
        config._debug('getRaw: call lodash.get ' + name);
        value = _get(config._data, name, defaultValue);
    }

    config._debug('getRaw: return value', value);

    return value;
};
