const searchReceivePlugin = require('./searchReceivePlugin');

module.exports = function methodsReceiveSearchPlugins(config, ConfigError) {
  const founded = [];

  config._from.forEach((from) => {
    config._debug('receive: search plugin for ', from.sourcepath);

    const plugin = searchReceivePlugin(config._receivePlugins, from.sourcepath);

    if (!plugin) {
      throw new ConfigError({
        code: ConfigError.CODES.UNKNOWN_SOURCE_TYPE,
        data: { sourcepath: from.sourcepath },
      });
    }

    config._debug(`receive: found plugin "${plugin.name}" for "${from.sourcepath}"`);

    founded.push({ from, plugin });
  });

  return founded;
};
