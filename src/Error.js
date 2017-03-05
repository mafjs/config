var ConfigError = require('maf-error').create('ConfigError', {
    INVALID_LOGGER: 'maf-config: no logger.debug method passed in constructor',
    INVALID_ARGS: 'maf-config: %method%: param %arg% should be a %type%',
    IMMUTABLE: 'maf-config: config set immutable'
});

module.exports = ConfigError;
