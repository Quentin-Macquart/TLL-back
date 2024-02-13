import { handleHttpClientError } from './error.utils';

describe('error utils', () => {
  test(' handle httpClientError should throw HTTP400Error', () => {
    // arrange
    const err = {
      message: 'invalid attribute',
      name: 'ValidationError',
    };
    // act & assert
    expect(() => handleHttpClientError(err)).toThrow('invalid attribute');
  });
});
