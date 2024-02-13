import { HTTPClientError, notFoundError } from '@app/shared/middleware';

describe('error handler middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('HTTP Client Error', () => {
    test('should call app.use ', () => {
      const httpClientError = new HTTPClientError({ error: 'weired error!' }, '400');
      // assert
      expect(httpClientError).toBeInstanceOf(Object);
    });
    test('notFound error should throw error', () => {
      // act & assert
      expect(() => notFoundError()).toThrow('Method not found.');
    });
  });
});
