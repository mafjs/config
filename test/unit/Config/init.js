var t = require('tap');

var proxyquire = require('proxyquire');

t.test('#init should call receive and validate methods', function (t) {

    var receiveCalled = false;

    var validateCalled = false;

    var Config = proxyquire('../../../package/Config.js', {
        './methods/receive': function () {

            return new Promise((resolve) => {
                receiveCalled = true;
                resolve();
            });

        },
        './methods/validate': function () {

            return new Promise(function (resolve) {
                validateCalled = true;
                resolve();
            });

        }
    });

    var config = new Config();

    config.init()
        .then(function () {
            t.ok(receiveCalled);
            t.ok(validateCalled);
            t.end();
        })
        .catch(function (error) {
            t.threw(error);
        });
});



t.test('#init should reject if receive rejected', function (t) {
    var receiveCalled = false;

    var Config = proxyquire('../../../package/Config.js', {
        './methods/receive': function () {

            return new Promise((resolve, reject) => {
                receiveCalled = true;
                reject(new Error('receive rejected'));
            });

        },
        './methods/validate': function () {

            return new Promise(function (resolve) {
                resolve();
            });

        }
    });

    var config = new Config();

    config.init()
            .then(function () {
                t.threw(new Error('should reject error'));
            })
            .catch(function (error) {
                t.ok(receiveCalled);
                t.equal(error.message, 'receive rejected');
                t.end();
            });
});


t.test('#init should reject if validate rejected', function (t) {

    var validateCalled = false;


    var Config = proxyquire('../../../package/Config.js', {
        './methods/receive': function () {

            return new Promise((resolve) => {
                resolve();
            });

        },
        './methods/validate': function () {

            return new Promise(function (resolve, reject) {
                validateCalled = true;
                reject(new Error('validate rejected'));
            });

        }
    });

    var config = new Config();

    config.init()
            .then(function () {
                t.threw(new Error('should reject error'));
            })
            .catch(function (error) {
                t.ok(validateCalled);
                t.equal(error.message, 'validate rejected');
                t.end();
            });
});
