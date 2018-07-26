const kindOf = require('../modules/kind-of');

const ConfigError = require('../Error');

module.exports = function methodsValidate(config) {
  return new Promise(((resolve, reject) => {
    if (config._validation) {
      config._debug('validate: call validation function');

      const promise = config._validation(config._data);

      if (
        !promise
                || kindOf(promise.then) !== 'function'
                || kindOf(promise.catch) !== 'function'
      ) {
        return reject(new ConfigError(
          ConfigError.CODES.INVALID_VALIDATION_FUNCTION,
        ));
      }

      promise
        .then((valid) => {
          config._debug('validate: validation function promise resolved');
          config._data = valid;
          config._valid = true;
          resolve();
        })
        .catch((error) => {
          config._debug(
            'validate: validation function promise rejected with message = ',
            error.message,
            'and code = ',
            error.code,
          );

          reject(new ConfigError(ConfigError.CODES.INVALID_DATA, error));
        });
    } else {
      config._debug('validate: no validation function, resolve');
      config._valid = true;
      resolve();
    }

    return undefined;
  }));
};
