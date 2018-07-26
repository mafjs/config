module.exports = function methodsReceiveSearchReceivePlugin(plugins, sourcepath) {
  let found = null;

  plugins.forEach((plugin) => {
    if (plugin.isMatch(sourcepath)) {
      found = plugin;
    }
  });

  return found;
};
