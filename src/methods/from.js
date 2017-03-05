var kindOf = require('../modules/kind-of');

var ConfigError = require('../Error');

var _in = require('./_in');

module.exports = function (config, sourcepath, to) {
    var sourcepathType = kindOf(sourcepath);

    if (_in(['string'], sourcepathType) === false) {

        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'from',
            arg: 'sourcepath',
            type: 'string'
        });

    }

    var toType = kindOf(to);

    if (_in(['string', 'array', 'undefined'], toType) === false) {

        throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
            method: 'from',
            arg: 'to',
            type: 'string, array, undefined'
        });

    }

    if (toType === 'string') {
        to = to.trim();
    }

    if (toType === 'undefined') {
        to = '.';
    }

    config._from.push({sourcepath: sourcepath, to: to});

    return config;
};
