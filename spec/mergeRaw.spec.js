import Config from '../src/Config';

jest.mock('../src/methods/mergeRaw', () => jest.fn());

describe('Config#mergeRaw', () => {
  it('should call methods/mergeRaw', () => {
    // eslint-disable-next-line global-require
    const mergeRaw = require('../src/methods/mergeRaw');

    const config = new Config();
    const data = {
      some: 'data',
    };

    config.mergeRaw(data);

    expect(mergeRaw).toBeCalledWith(config, data);
  });
});
