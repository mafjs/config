module.exports = function (plugins, sourcepath) {

    var found = null;

    for (var i in plugins) {

        var plugin = plugins[i];

        if (plugin.isMatch(sourcepath)) {
            found = plugin;
            break;
        }
    }

    return found;
};
