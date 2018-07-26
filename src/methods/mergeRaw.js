const _merge = require('lodash.merge');

const kindOf = require('../modules/kind-of');

const ConfigError = require('../Error');

const _in = require('./_in');

module.exports = function methodsMergeRaw(config, source) {
  config._debug('mergeRaw: source = ', source);

  const typeOfSource = kindOf(source);

  config._trace('mergeRaw: typeOf source = ', typeOfSource);

  if (_in(['object', 'array'], typeOfSource) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'mergeRaw',
        arg: 'source',
        type: 'object, array',
      },
    });
  }

  const data = _merge(config._data, source);

  config.setRaw('.', data);

  return config;
};
