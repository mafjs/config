var kindOf = require('./modules/kind-of');

var ConfigError = require('./Error');

// class methods
var set = require('./methods/set');
var get = require('./methods/get');
var validate = require('./methods/validate');
var use = require('./methods/use');
var from = require('./methods/from');
var receive = require('./methods/receive');

class Config {

    /**
     * @param {?Logger} logger
     */
    constructor (logger) {
        this.Error = ConfigError;

        this._logger = this._validateLogger(logger);

        this._immutable = false;
        this._valid = false;
        this._validation = null;

        this._data = {};

        this._from = [];

        this._receivePlugins = [];
        this._validatePlugin = null;
    }

    /**
     * set config immutable or mutable
     *
     * @param {Boolean} flag
     * @return {this}
     */
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

    /**
     * get config param
     *
     * @param {String|Array} name
     * @param {Null|Array|String|Number|Object|Boolean} defaultValue
     * @return {Undefined|Null|Array|String|Number|Object|Boolean}
     */
    get (name, defaultValue) {
        return get(this, name, defaultValue);
    }

    /**
     * set validation function
     *
     * @param {Function} validationFunction
     * @return {this}
     */
    validation (validationFunction) {

        if (kindOf(validationFunction) !== 'function') {
            throw ConfigError.createError(ConfigError.CODES.INVALID_ARGS, {
                method: 'validation',
                arg: 'validationFunction',
                type: 'function'
            });
        }

        this._validation = validationFunction;

        return this;
    }

    /**
     * validate config
     *
     * @return {Promise}
     */
    validate () {
        return validate(this);
    }

    /**
     * is config valid
     *
     * @return {Boolean}
     */
    isValid () {
        return this._valid;
    }

    /**
     * add plugin
     *
     * @param {Function} plugin
     * @param {Object} options
     * @return {this}
     */
    use (plugin, options) {
        use(this, plugin, options);
        return this;
    }

    /**
     * set config part sourcepath and key in config
     *
     * @param {String} sourcepath
     * @param {String|Array|Undefined} to
     * @return {this}
     */
    from (sourcepath, to) {
        return from(this, sourcepath, to);
    }

    /**
     * receive sources
     *
     * @return {this}
     */
    receive () {
        return receive(this);
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
