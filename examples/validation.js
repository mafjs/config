var joi = require('joi');

var Config = require(__dirname + '/../package/Config');

var config = new Config();


config.validation(function (raw) {

    return new Promise(function (resolve, reject) {

        var schema = joi.object().required().keys({
            host: joi.string().allow(null).required(),
            port: joi.number().required()
        });

        joi.validate(raw, schema, {convert: true}, function (error, valid) {
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
    .then(function () {
        console.log(config.get('.'));
    })
    .catch(function (error) {
        console.log(error);
    });
