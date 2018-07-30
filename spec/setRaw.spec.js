import Config from '../src/Config';

jest.mock('../src/methods/setRaw', () => jest.fn((() => 'test')));

describe('Config#setRaw', () => {
  it('should call methods/setRaw', () => {
    // eslint-disable-next-line global-require
    const setRaw = require('../src/methods/setRaw');

    const config = new Config();

    const result = config.setRaw('test', '100500');

    expect(setRaw).toBeCalledWith(config, 'test', '100500');
    expect(result).toEqual('test');
  });
});
