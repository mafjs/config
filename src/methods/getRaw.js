const _get = require('lodash.get');

const kindOf = require('../modules/kind-of');

const ConfigError = require('../Error');

const _in = require('./_in');

module.exports = function methodsGetRaw(config, name, defaultValue) {
  config._debug(
    'getRaw: name = ', name,
    'defaultValue = ', defaultValue,
  );

  const typeOfName = kindOf(name);

  config._debug('getRaw: typeOf name = ', typeOfName);

  if (_in(['string', 'array'], typeOfName) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'getRaw',
        arg: 'name',
        type: 'string, array',
      },
    });
  }

  if (typeOfName === 'string') {
    name = name.trim();
  }

  const typeOfDefaultValue = kindOf(defaultValue);

  config._debug('getRaw: typeOf value = ', typeOfDefaultValue);

  let value;

  if (name === '.') {
    value = config._data;
    config._debug('getRaw: name == \'.\' return full config object');
  } else {
    config._debug(`getRaw: call lodash.get ${name}`);
    value = _get(config._data, name, defaultValue);
  }

  config._debug('getRaw: return value', value);

  return value;
};
