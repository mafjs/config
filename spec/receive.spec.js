import Config from '../src/Config';

jest.mock('../src/methods/receive', () => jest.fn((() => 'test')));

describe('Config#receive', () => {
  it('should call methods/receive', () => {
    // eslint-disable-next-line global-require
    const receive = require('../src/methods/receive');

    const config = new Config();

    const result = config.receive();

    expect(receive).toBeCalledWith(config);
    expect(result).toEqual('test');
  });
});
