const _set = require('lodash.set');

const kindOf = require('../modules/kind-of');

const ConfigError = require('../Error');

const _in = require('./_in');

module.exports = function methodsSet(config, name, value) {
  config._debug(
    'set: name = ', name,
    'value = ', value,
    '_immutable = ', config._immutable,
  );

  if (config._immutable === true) {
    throw new ConfigError(ConfigError.CODES.IMMUTABLE);
  }

  const typeOfName = kindOf(name);

  config._debug('set: typeOf name = ', typeOfName);

  const nameTypes = ['string', 'array'];

  if (_in(nameTypes, typeOfName) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'set',
        arg: 'name',
        type: 'string, array',
      },
    });
  }

  if (typeOfName === 'string') {
    name = name.trim();
  }

  const typeOfValue = kindOf(value);

  config._debug('set: typeOf value = ', typeOfValue);

  const valueTypes = ['null', 'array', 'string', 'number', 'object', 'boolean'];

  if (_in(valueTypes, typeOfValue) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'set',
        arg: 'value',
        type: 'null, array, string, number, object, boolean',
      },
    });
  }

  if (name === '.') {
    config._data = value;
  } else {
    _set(config._data, name, value);
  }

  return config;
};
