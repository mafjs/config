/* eslint-disable no-console */

let joi = require('joi');

let Config = require(__dirname + '/../package/Config');

let config = new Config();


config.validation(function(raw) {
    return new Promise(function(resolve, reject) {
        let schema = joi.object().required().keys({
            host: joi.string().allow(null).required(),
            port: joi.number().required()
        });

        joi.validate(raw, schema, {convert: true}, function(error, valid) {
            if (error) {
                return reject(error);
            }

            resolve(valid);
        });
    });
});


config
    .set('.', {host: null, port: '80'})
    .setImmutable(true)
    .validate()
    .then(function() {
        console.log(config.get('.'));
    })
    .catch(function(error) {
        console.log(error);
    });

/* eslint-enable no-console */
