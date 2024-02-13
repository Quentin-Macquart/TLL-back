import {
  clientError,
  forbiddenError,
  handle400Error,
  handle401Error,
  handle403Error,
  handle404Error,
  handleClientError,
  handleServerError,
  inputError,
  notFoundError,
  serverError,
  unauthorizedError,
} from '@app/shared/middleware';
import { mockNext, mockResponse } from '@app/shared/utils/helper/test-utils';

describe('error handler middleware', () => {
  let next: any;
  let res: any;
  beforeEach(() => {
    jest.clearAllMocks();
    res = mockResponse();
    next = mockNext();
  });
  describe('not found errors', () => {
    test('should call app.use ', () => {
      // arrange
      const app: any = {
        listen: jest.fn(),
        use: jest.fn(),
      };
      // act
      handle404Error(app);
      // assert
      expect(app.use).toHaveBeenCalledTimes(1);
    });

    test('notFound error should throw error', () => {
      // act & assert
      expect(() => notFoundError()).toThrow('Method not found.');
    });
  });

  describe('input errors', () => {
    test('should call app.use ', () => {
      // arrange
      const app: any = {
        listen: jest.fn(),
        use: jest.fn(),
      };
      // act
      handle400Error(app);
      // assert
      expect(app.use).toHaveBeenCalledTimes(1);
    });
    test('notFound error should throw error', () => {
      // act & assert
      expect(() => inputError()).toThrow('Input error.');
    });
  });
  describe('unauthorized errors', () => {
    test('should call app.use ', () => {
      // arrange
      const app: any = {
        listen: jest.fn(),
        use: jest.fn(),
      };
      // act
      handle401Error(app);
      // assert
      expect(app.use).toHaveBeenCalledTimes(1);
    });
    test('Unauthorized error should throw error', () => {
      // act & assert
      expect(() => unauthorizedError()).toThrow('Unauthorized.');
    });
  });
  describe('forbidden errors', () => {
    test('should call app.use ', () => {
      // arrange
      const app: any = {
        listen: jest.fn(),
        use: jest.fn(),
      };
      // act
      handle403Error(app);
      // assert
      expect(app.use).toHaveBeenCalledTimes(1);
    });
    test('Forbidden error should throw error', () => {
      // act & assert
      expect(() => forbiddenError()).toThrow('Forbidden.');
    });
  });
  describe('client errors', () => {
    test('should call app.use ', () => {
      // arrange
      const app: any = {
        listen: jest.fn(),
        use: jest.fn(),
      };
      // act
      handleClientError(app);
      // assert
      expect(app.use).toHaveBeenCalledTimes(1);
    });
    test('should fail', () => {
      const err = {
        message: 'invalid attribute',
        name: 'ClientError',
        statusCode: 400,
        code: 'NOT_VALID_ATTRIBUTES',
      };
      // act
      clientError(err, res, next);
      // assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
    test('should call next', () => {
      // arrange
      const err = {
        message: 'invalid attribute',
        name: 'TypeError',
        statusCode: 400,
        code: 'NOT_VALID_ATTRIBUTES',
      };
      // act
      clientError(err, res, next);
      // assert
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('server errors', () => {
    // arrange
    const err = {
      message: 'invalid attribute',
      name: 'TypeError',
      statusCode: 500,
    };

    test('should call app.use ', () => {
      // arrange
      const app: any = {
        listen: jest.fn(),
        use: jest.fn(),
      };
      // act
      handleServerError(app);
      // assert
      expect(app.use).toHaveBeenCalledTimes(1);
    });

    test('serverError should call res.json', () => {
      // act
      serverError(err, res, next);
      // assert
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
