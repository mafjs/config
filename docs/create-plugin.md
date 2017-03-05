# Create maf-config Plugin

## plugin types

- [`receive`](#receive-plugin-type) - get config data from anywhere
- [`validate`]() - validate with your favorite validator


## `receive` plugin type

should implement interface



### `constructor ([logger])`

- `logger` - Logger. Optional. if passed, should have debug method



### `init (options)`

- `options` - Object. options object from `use` method (`config.use(plugin, options)`)

return `Promise`



### `isMatch (filepath)`

check that filepath processed by plugin

- `filepath` - String. path to config

return `Promise`

Promise should resolve `Boolean`



### `exists (filepath)`

check file exists

- `filepath` - String. path to config

return `Promise`

Promise should resolve `Boolean`



### `read (filepath)`

read config

- `filepath` - String. path to config

return `Promise`

in this method your can read and parse config

Promise should resolve config object


## `validate` plugin type

TODO
