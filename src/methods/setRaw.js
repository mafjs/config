const _set = require('lodash.set');

const kindOf = require('../modules/kind-of');

const ConfigError = require('../Error');

const _in = require('./_in');

module.exports = function methodsSetRaw(config, name, value) {
  config._debug(
    'setRaw: name = ', name,
    'value = ', value,
    '_immutable = ', config._immutable,
  );

  if (config._immutable === true) {
    throw new ConfigError(ConfigError.CODES.IMMUTABLE);
  }

  const typeOfName = kindOf(name);

  config._debug('setRaw: typeOf name = ', typeOfName);

  const nameTypes = ['string', 'array'];

  if (_in(nameTypes, typeOfName) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'setRaw',
        arg: 'name',
        type: 'string, array',
      },
    });
  }

  if (typeOfName === 'string') {
    name = name.trim();
  }

  const typeOfValue = kindOf(value);

  config._debug('setRaw: typeOf value = ', typeOfValue);

  if (name === '.') {
    config._data = value;
  } else {
    _set(config._data, name, value);
  }

  return config;
};
