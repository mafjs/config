let _get = require('lodash.get');

let kindOf = require('../modules/kind-of');

let ConfigError = require('../Error');

let _in = require('./_in');

module.exports = function(config, name, defaultValue) {
    config._debug(
        'getRaw: name = ', name,
        'defaultValue = ', defaultValue
    );

    let typeOfName = kindOf(name);

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

    let typeOfDefaultValue = kindOf(defaultValue);

    config._debug('getRaw: typeOf value = ', typeOfDefaultValue);

    let value;

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
