const ConfigError = require('../../Error');

const searchPlugins = require('./searchPlugins');
const read = require('./read');

module.exports = function methodsReceiveIndex(config) {
  return new Promise((resolve, reject) => {
    config._debug('receive: start receive sources');

    if (config._from.length === 0) {
      config._debug('receive: no from, resolve');
      return resolve();
    }

    // search plugin for sources
    const founded = searchPlugins(config, ConfigError);

    // read sources
    const promises = read(config, ConfigError, founded);

    Promise.all(promises)
      .then((result) => {
        founded.forEach(({ from }, i) => {
          const data = result[i];
          config.set(from.to, data);
        });

        resolve();
      })
      .catch((error) => {
        // TODO get error data from error
        reject(new ConfigError({
          code: ConfigError.CODES.FAILED_TO_READ_SOURCE,
          cause: error,
        }));
      });

    return undefined;
  });
};
