import Config from '../src/Config';

jest.mock('../src/methods/set', () => jest.fn((() => 'test')));

describe('Config#set', () => {
  it('should call methods/set', () => {
    // eslint-disable-next-line global-require
    const set = require('../src/methods/set');

    const config = new Config();

    const result = config.set('test', '100500');

    expect(set).toBeCalledWith(config, 'test', '100500');
    expect(result).toEqual('test');
  });
});
