import {
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  handleDocs,
  handleHelmet,
} from '@app/shared/middleware/middleware';

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handle body parsing: should call app.use ', () => {
    // arrange
    const app: any = {
      listen: jest.fn(),
      use: jest.fn(),
    };
    // act
    handleBodyRequestParsing(app);
    // assert
    expect(app.use).toHaveBeenCalledTimes(2);
  });

  test('handle Cors: should call app.use ', () => {
    // arrange
    const app: any = {
      listen: jest.fn(),
      use: jest.fn(),
    };
    // act
    handleCors(app);
    // assert
    expect(app.use).toHaveBeenCalledTimes(1);
  });

  test('handle Compression: should call app.use ', () => {
    // arrange
    const app: any = {
      listen: jest.fn(),
      use: jest.fn(),
    };
    // act
    handleCompression(app);
    // assert
    expect(app.use).toHaveBeenCalledTimes(1);
  });

  test('handle Helmet: should call app.use ', () => {
    // arrange
    const app: any = {
      listen: jest.fn(),
      use: jest.fn(),
    };
    // act
    handleHelmet(app);
    // assert
    expect(app.use).toHaveBeenCalledTimes(1);
  });

  test('handle Docs: should call app.use ', () => {
    // arrange
    const app: any = {
      listen: jest.fn(),
      use: jest.fn(),
    };
    // act
    handleDocs(app);
    // assert
    expect(app.use).toHaveBeenCalledTimes(1);
  });
});
