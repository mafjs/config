import Config from '../src/Config';

jest.mock('../src/methods/getRaw', () => jest.fn((() => 'get-raw-result')));

describe('Config#get', () => {
  it('should call get method function', () => {
    const config = new Config();

    // eslint-disable-next-line global-require
    const getRaw = require('../src/methods/getRaw');

    config.getRaw('100', 500);

    expect(getRaw).toBeCalledWith(config, '100', 500);
  });

  it('should return result of get method', () => {
    const config = new Config();

    const result = config.getRaw('100', 500);

    expect(result).toEqual('get-raw-result');
  });
});
