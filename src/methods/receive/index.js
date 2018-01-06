let ConfigError = require('../../Error');

let searchPlugins = require('./searchPlugins');
let read = require('./read');

module.exports = function(config) {
    return new Promise((resolve, reject) => {
        config._debug('receive: start receive sources');

        if (config._from.length === 0) {
            config._debug('receive: no from, resolve');
            return resolve();
        }

        // search plugin for sources
        let founded = searchPlugins(config, ConfigError);

        // read sources
        let promises = read(config, ConfigError, founded);

        Promise.all(promises)
            .then(function(result) {
                founded.forEach(({from}, i) => {
                    const data = result[i];
                    config.set(from.to, data);
                });

                resolve();
            })
            .catch(function(error) {
                // TODO get error data from error
                reject(ConfigError.createError(
                    ConfigError.CODES.FAILED_TO_READ_SOURCE,
                    error
                ));
            });
    });
};
