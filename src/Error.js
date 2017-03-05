var ConfigError = require('maf-error').create('ConfigError', {
    INVALID_LOGGER: 'maf-config: no logger.debug method passed in constructor',
    INVALID_VALIDATION_FUNCTION: 'maf-config: validation function should return Promise',
    INVALID_ARGS: 'maf-config: %method%: param %arg% should be a %type%',
    INVALID_DATA: 'maf-config: invalid config data, validation fails',
    IMMUTABLE: 'maf-config: config set immutable'
});

module.exports = ConfigError;
