// import { DataHelper } from '@app/shared/utils/helper/data-helper';
import { getPort } from '@app/shared/utils';
import { config } from '@app/shared/config';

describe('test input-validator middleware', () => {
  // let obj;
  beforeEach(() => {
    // build test object
    // obj = DataHelper.buildDataBody();
    process.env.NODE_ENV = 'test';
  });
  test('should return port value in env is dev', async () => {
    config.server.port = undefined;
    const result = getPort();
    // assert
    expect(result).toEqual(3000);
  });
  test('should return port value in env is dev', async () => {
    config.server.port = 4000;
    const result = getPort();
    // assert
    expect(result).toEqual(4000);
  });
});
