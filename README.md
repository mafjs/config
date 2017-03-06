# maf-config

extendable config

[![bitHound Overall Score](https://www.bithound.io/github/mafjs/config/badges/score.svg)](https://www.bithound.io/github/mafjs/config)
[![bitHound Dependencies](https://www.bithound.io/github/mafjs/config/badges/dependencies.svg)](https://www.bithound.io/github/mafjs/config/master/dependencies/npm)
[![Build Status](https://travis-ci.org/mafjs/config.svg?branch=master)](https://travis-ci.org/mafjs/config)
[![Coverage Status](https://coveralls.io/repos/github/mafjs/config/badge.svg?branch=master)](https://coveralls.io/github/mafjs/config?branch=master)

[![NPM](https://nodei.co/npm/maf-config.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/maf-config/)

# install

```
npm install --save maf-config
```

# usage

this package can be used with node.js or in browser

by default config can't receive any config types, use [plugins](#plugins)

here example of node.js usage, reading json configs

```js
var Config = require('maf-config');

var config = new Config();

config
    .use(require('maf-config-from-json'))
    .from('/etc/config/base.json')
    .from('/etc/config/mysql.json', 'db.mysql')
    .from('/etc/config/mongo.json', 'db.mongo')
    .from('/etc/config/api.json', 'api')
    .init()
    .then(() => {
        config.setImmutable(true);

        var fullConfigObject = config.get('.');

        // fullConfigObject =
        {
            // host and port from base.json
            host: 'localhost',
            port: 80,

            db: {
                mysql: {
                    // from mysql.json
                },
                mongo: {
                    // from mongo.json
                }
            },
            api: {
                // from api.json
            }
        }
    })
    .catch((error) => {
        // log error
    });
```

for more details (plugins, validation) - see [examples](https://github.com/mafjs/config/tree/master/examples)

# plugins

[maf-config-from-json](https://github.com/mafjs/config-from-json) - read json configs

# API

see [docs/api.md](docs/api.md)

# LICENSE

MIT
