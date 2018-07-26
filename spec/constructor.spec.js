/* eslint-disable no-new */
import Config from '../src/Config';
import ConfigError from '../src/Error';

describe('Config#constructor', () => {
  it('should create without errors', () => {
    new Config();
  });

  it('when logger with debug method passed, should create without errors', () => {
    const logger = {
      debug() {},
      trace() {},
    };

    new Config(logger);
  });


  it('when logger has no debug method, should throw error', () => {
    const logger = {};
    try {
      new Config(logger);
    } catch (error) {
      expect(error).toBeInstanceOf(ConfigError);
      expect(error.code).toEqual(ConfigError.CODES.INVALID_LOGGER);
    }
  });

  it('when logger has no trace method, should throw error', () => {
    const logger = {
      debug: jest.fn(),
    };

    try {
      new Config(logger);
    } catch (error) {
      expect(error).toBeInstanceOf(ConfigError);
      expect(error.code).toEqual(ConfigError.CODES.INVALID_LOGGER);
    }
  });
});
