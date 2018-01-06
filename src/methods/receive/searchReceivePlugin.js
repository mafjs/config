module.exports = function(plugins, sourcepath) {
    let found = null;

    plugins.forEach((plugin) => {
        if (plugin.isMatch(sourcepath)) {
            found = plugin;
        }
    });

    return found;
};
