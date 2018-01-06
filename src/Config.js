let kindOf = require('./modules/kind-of');

let ConfigError = require('./Error');

// class methods
let set = require('./methods/set');
let get = require('./methods/get');
let validate = require('./methods/validate');
let use = require('./methods/use');
let from = require('./methods/from');
let receive = require('./methods/receive');
let getRaw = require('./methods/getRaw');
let setRaw = require('./methods/setRaw');
let mergeRaw = require('./methods/mergeRaw');

/**
 * Config
 */
class Config {
    /**
     * @param {?Logger} logger
     */
    constructor(logger) {
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
    setImmutable(flag) {
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
     * is config immutable
     *
     * @return {Boolean}
     */
    isImmutable() {
        return this._immutable;
    }

    /**
     * set config param
     *
     * @param {String|Array} name
     * @param {Null|Array|String|Number|Object|Boolean} value
     * @return {this}
     */
    set(name, value) {
        return set(this, name, value);
    }

    /**
     * get config param
     *
     * @param {String|Array} name
     * @param {Null|Array|String|Number|Object|Boolean} defaultValue
     * @return {Undefined|Null|Array|String|Number|Object|Boolean}
     */
    get(name, defaultValue) {
        return get(this, name, defaultValue);
    }

    /**
     * set raw config param
     *
     * @param {String|Array} name
     * @param {*} value
     * @return {this}
     */
    setRaw(name, value) {
        return setRaw(this, name, value);
    }

    /**
     * get raw config param
     * returned value NOT cloned
     *
     * @param {String|Array} name
     * @param {*} defaultValue
     * @return {*}
     */
    getRaw(name, defaultValue) {
        return getRaw(this, name, defaultValue);
    }

    /**
     * merge raw data
     *
     * @param {Object|Array} source
     * @return {this}
     */
    mergeRaw(source) {
        return mergeRaw(this, source);
    }

    /**
     * set validation function
     *
     * @param {Function} validationFunction
     * @return {this}
     */
    validation(validationFunction) {
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
    validate() {
        return validate(this);
    }

    /**
     * is config valid
     *
     * @return {Boolean}
     */
    isValid() {
        return this._valid;
    }

    /**
     * add plugin
     *
     * @param {Function} plugin
     * @param {Object} options
     * @return {this}
     */
    use(plugin, options) {
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
    from(sourcepath, to) {
        return from(this, sourcepath, to);
    }

    /**
     * receive sources
     *
     * @return {this}
     */
    receive() {
        return receive(this);
    }

    /**
     * receive and validate config
     *
     * @return {Promise}
     */
    init() {
        return new Promise((resolve, reject) => {
            this._debug('init: call');

            this.receive()
                .then(() => {
                    return this.validate();
                })
                .then(() => {
                    this._debug('init: done');
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * clone config
     *
     * @param {?String} name
     * @return {Config}
     */
    clone(name) {
        if (!name) {
            name = '.';
        }

        let data = this.get(name);

        let newConfig = new Config(this._logger);

        newConfig.setRaw('.', data);

        newConfig.setImmutable(this.isImmutable());

        return newConfig;
    }

    /**
     * validate logger
     *
     * @private
     * @param {?Logger} logger
     * @return {Logger|Null}
     */
    _validateLogger(logger) {
        if (!logger) {
            return null;
        }

        if (typeof logger.debug !== 'function') {
            throw new ConfigError(ConfigError.CODES.INVALID_LOGGER);
        }

        if (typeof logger.trace !== 'function') {
            throw new ConfigError(ConfigError.CODES.INVALID_LOGGER);
        }

        return logger;
    }

    /* istanbul ignore next */
    /**
     * @private
     */
    _debug(...args) {
        if (
            this._logger &&
            this._logger.debug &&
            typeof this._logger.debug === 'function'
        ) {
            args.unshift(this._logger);
            this._logger.debug.apply(...args);
        }
    }

    /* istanbul ignore next */
    /**
     * @private
     */
    _trace(...args) {
        if (
            this._logger &&
            this._logger.trace &&
            typeof this._logger.trace === 'function'
        ) {
            args.unshift(this._logger);
            this._logger.trace.apply(...args);
        }
    }
}

module.exports = Config;
