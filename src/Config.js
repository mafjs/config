// var kindOf = require('./modules/kind-of');

var ConfigError = require('./Error');

// class methods
var set = require('./methods/set');
var get = require('./methods/get');

class Config {

    /**
     * @param {?Logger} logger
     */
    constructor (logger) {
        this.Error = ConfigError;

        this._logger = this._validateLogger(logger);

        this._immutable = false;

        this._raw = {};
        this._data = {};
    }

    setImmutable (flag) {
        if (typeof flag !== 'boolean') {
            throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
                method: 'setImmutable',
                arg: 'flag',
                type: 'boolean'
            });
        }

        this._immutable = flag;

        return this;
    }

    /**
     * set config param
     *
     * @param {String|Array} name
     * @param {Null|Array|String|Number|Object|Boolean} value
     * @return {this}
     */
    set (name, value) {
        return set(this, name, value);
    }

    get (name, defaultValue) {
        return get(this, name, defaultValue);
    }

    /**
     * validate logger
     *
     * @private
     * @param {?Logger} logger
     * @return {Logger|Null}
     */
    _validateLogger (logger) {
        if (!logger) {
            return null;
        }

        if (typeof logger.debug !== 'function') {
            throw new ConfigError(ConfigError.CODES.INVALID_LOGGER);
        }

        return logger;
    }

    /* istanbul ignore next */
    /**
     * @private
     */
    _debug () {
        if (
            this._logger &&
            this._logger.debug &&
            typeof this._logger.debug === 'function'
        ) {
            this._logger.debug.apply(this._logger, arguments);
        }
    }
}

module.exports = Config;
