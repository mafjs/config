import ConfigError from '../Error';

const kindOf = require('../modules/kind-of');

const _in = require('./_in');

module.exports = function methodsFrom(config, sourcepath, to) {
  const sourcepathType = kindOf(sourcepath);

  if (_in(['string'], sourcepathType) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'from',
        arg: 'sourcepath',
        type: 'string',
      },
    });
  }

  const toType = kindOf(to);

  if (_in(['string', 'array', 'undefined'], toType) === false) {
    throw new ConfigError({
      code: ConfigError.CODES.INVALID_ARGS,
      data: {
        method: 'from',
        arg: 'to',
        type: 'string, array, undefined',
      },
    });
  }

  if (toType === 'string') {
    to = to.trim();
  }

  if (toType === 'undefined') {
    to = '.';
  }

  config._from.push({ sourcepath, to });

  return config;
};
