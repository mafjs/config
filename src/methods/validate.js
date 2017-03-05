var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

module.exports = function (config) {

    return new Promise(function (resolve, reject) {

        if (config._validation) {

            config._debug('validate: call validation function');

            var promise = config._validation(config._data);

            if (
                !promise ||
                kindOf(promise.then) !== 'function' ||
                kindOf(promise.catch) !== 'function'
            ) {
                return reject(ConfigError.createError(
                    ConfigError.CODES.INVALID_VALIDATION_FUNCTION
                ));
            }

            promise
                .then(function (valid) {
                    config._debug('validate: validation function promise resolved');
                    config._data = valid;
                    config._valid = true;
                    resolve();
                })
                .catch(function (error) {
                    config._debug(
                        'validate: validation function promise rejected with message = ',
                        error.message,
                        'and code = ',
                        error.code
                    );

                    reject(ConfigError.createError(ConfigError.CODES.INVALID_DATA, error));
                });

        } else {
            config._debug('validate: no validation function, resolve');
            config._valid = true;
            resolve();
        }

    });

};
