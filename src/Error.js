let ConfigError = require('maf-error').create('ConfigError', {
    INVALID_LOGGER: 'maf-config: no logger.debug method passed in constructor',
    INVALID_VALIDATION_FUNCTION: 'maf-config: validation function should return Promise',
    INVALID_ARGS: 'maf-config: %method%: param %arg% should be a %type%',
    INVALID_DATA: 'maf-config: invalid config data, validation fails',
    INVALID_PLUGIN: 'maf-config: plugin has invalid interface',
    INVALID_PLUGIN_TYPE: 'maf-config: invalid plugin type = %type%',
    INVALID_PLUGIN_READ: 'maf-config: plugin "%name%" read function should return Promise',
    IMMUTABLE: 'maf-config: config set immutable',
    UNKNOWN_SOURCE_TYPE: 'maf-config: unknown source type for %sourcepath%',
    FAILED_TO_READ_SOURCE: 'maf-config: failed to read config source'
});

module.exports = ConfigError;
