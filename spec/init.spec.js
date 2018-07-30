/* eslint-disable global-require */
import Config from '../src/Config';

jest.mock('../src/methods/receive', () => jest.fn());

jest.mock('../src/methods/validate', () => jest.fn());

describe('Config#init', () => {
  beforeEach(() => {
    const receive = require('../src/methods/receive');
    receive.mockResolvedValue('received');

    const validate = require('../src/methods/validate');
    validate.mockResolvedValue('validated');
  });

  it('should call receive and validate methods', () => {
    const receive = require('../src/methods/receive');
    const validate = require('../src/methods/validate');

    const config = new Config();

    return config.init()
      .then(() => {
        expect(receive).toBeCalled();
        expect(validate).toBeCalled();
      });
  });

  it('should reject if receive rejected', (done) => {
    const receive = require('../src/methods/receive');

    receive.mockRejectedValue(new Error('receive failed'));

    const config = new Config();

    config.init()
      .then(() => {
        done(new Error('should throw error'));
      })
      .catch((error) => {
        expect(error.message).toEqual('receive failed');
        done();
      });
  });

  it('should reject if validate rejected', (done) => {
    const validate = require('../src/methods/validate');

    validate.mockRejectedValue(new Error('validate failed'));

    const config = new Config();

    config.init()
      .then(() => {
        done(new Error('should throw error'));
      })
      .catch((error) => {
        expect(error.message).toEqual('validate failed');
        done();
      });
  });
});
