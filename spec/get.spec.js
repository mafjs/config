import Config from '../src/Config';

jest.mock('../src/methods/get', () => jest.fn((() => 'get-result')));

describe('Config#get', () => {
  it('should call get method function', () => {
    const config = new Config();

    // eslint-disable-next-line global-require
    const get = require('../src/methods/get');

    config.get('100', 500);

    expect(get).toBeCalledWith(config, '100', 500);
  });

  it('should return result of get method', () => {
    const config = new Config();

    const result = config.get('100', 500);

    expect(result).toEqual('get-result');
  });
});
