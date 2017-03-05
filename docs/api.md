# maf-config 0.x API

- [Config](#config)
    - [`constructor ([logger])`](#constructor-logger)
    - [`setImmutable (flag)`](#setimmutable-flag)
    - [`set (name, value)`](#set-name-value)
    - [`get (name, [defaultValue = null])`](#get-name-defaultvalue--null)
    - [`validation (validationFunction)`](#validation-validationfunction)
    - [`validate ()`](#validate-)
    - [`init ()`](#init-)
    - [`use (plugin)`](#use-plugin)
    - [`from (filepath)`](#from-filepath)
    - [`part (filepath, [pathInConfig])`](#part-filepath-pathinconfig)
    - [`parts (configParts)`](#parts-configparts)
- [ConfigError](#configerror)
    - [error codes](error-codes)

## Config



### `constructor ([logger])`

- `logger` - Logger. optional. if passed, should have debug method



### `setImmutable (flag)`

set config immutable or allow changes

by default config **muttable** - changes allowed

- `flag` - Boolean. true - config immutable, false - not

return `this`



### `set (name, value)`

set config param

- `name` - String. dot-delimeted path to param (see lodash.set)
- `value` - Null|String|Number|Array|Object|Boolean

return `this`

use `config.set('.', value)` if need to set all config object

throws `ConfigError code = IMMUTABLE`, if config set immutable
throws `ConfigError code = INVALID_ARGS` if some args in function invalid

if you need dots in param names - set name param as Array, here [example](https://github.com/lodash/lodash/issues/1637#issuecomment-156258271



### `get (name, [defaultValue = undefined])`

get config param

- `name` - String. dot-delimeted path to param (see lodash.get)
- `defaultValue = undefined` - Null|String|Number|Array|Object

return param value or defaultValue if not exists

return value cloned

use `config.get('.')` if need to get all config object

throws `ConfigError code = INVALID_ARGS` if some args in function invalid

if you need dots in param names - set name param as Array, here [example](https://github.com/lodash/lodash/issues/1637#issuecomment-156258271)



### `validation (validationFunction)`

set validation function

- `validationFunction` - Function. get raw config param and should return Promise

in `validationFunction` config can be modified, convert param types or etc.

throws `ConfigError code = INVALID_ARGS` if validationFunction is not a function

return `this`

**Example**

```js
config.validation(function (raw) {

    return new Promise(function (resolve, reject) {
        // validate and convert config param

        var config = validateAndConvert(raw);

        resolve(raw);
    });

})
```


### `validate ()`

call validationFunction and apply config

return `Promise`

throws `ConfigError, code = INVALID` if raw config data invalid



### `init ()`

init config

- read configs from sources
- validate: call validationFunction
- apply valid config

return `Promise`

throws `ConfigError, code = INVALID` if raw config data invalid



### `use (plugin, [options])`

add config plugin

- `plugin`. Object. see [Create Plugin article](create-plugin.md) for plugin creation details
- `options`. Object. Optional. Plugin settings


return `this`



### `from (filepath)`

set path to full config

- `filepath` - String. Path to config file, filetype processing in config plugins see `use` method

data from `filepath` fully replace raw config (before init or validation) and will be set as valid after init or validation

no any config file types supported by default, use `use` method and add config plugin for your file type

return `this`


### `part (filepath, [pathInConfig])`

set path to file config part

- `filepath` - String. Path to config file part. If filename contains dots it will be used as dot-separated path to param (see example below)
- `pathInConfig` - String. Optional. dot-separated path to param in config (see lodash.set)

By default key in config will be filename without extension

no any config file types supported by default, use `use` method and add config plugin for your file type

return `this`

**Examples**

#### /etc/mongo-db.json

```json
{
    "host": null,
    "port": 27017
}
```


```js

config.part('/etc/mongo-db.json');

config.init()
    .then(() => {
        var fullConfig = config.get('.');

        // fullConfig =
        {
            db: {
                host: null,
                port: 27017
            }
        }
    })
    // ...

// OR

config.part('/etc/db.mongo.json');

config.init()
    .then(() => {
        var fullConfig = config.get('.');

        // fullConfig =
        {
            db: {
                mongo: {
                    host: null,
                    port: 27017
                }
            }

        }
    })


// OR


config.part('/etc/mongo-db.json', 'mongoDb');

config.init()
    .then(() => {
        var fullConfig = config.get('.');

        // fullConfig =
        {
            mongoDb: {
                host: null,
                port: 27017
            }
        }
    })
    // ...

```

### `parts (configParts)`

set paths to config parts

- `configParts` - Object[String] or Array[String]. Paths to config parts

For Object

object key can be dot-separated path to param in config (@see lodash.set)

value of key should be config part path

For Array

items should contain config part path

If file item contains dots it will be used as dot-separated path to param (see example below)

no any config file types supported by default, use `use` method and add config plugin for your file type

return `this`

if your config part filenames should be config keys without modifications use Array

```js
config.parts([
    '/etc/db.json',
    '/etc/browserVersions.json'
]);

config.init()
    .then(() => {
        config.get('db');
        config.get('browserVersions');
    })
```

if your need custom config keys for every part

```js

config.parts({
    'db.mongo': '/etc/mongo-db.json',
    browserVersions: '/etc/browser-versions.json'
});

config.init()
    .then(() => {
        var fullConfig = config.get('.');

        // fullConfig =
        {
            db: {
                mongo: {
                    // ...
                }
            },
            browserVersions: {
                // ..
            }
        }
    })
```



## ConfigError

### error codes

- IMMUTABLE - throw if try to modify immutable config
- INVALID   - throw if validation fails
