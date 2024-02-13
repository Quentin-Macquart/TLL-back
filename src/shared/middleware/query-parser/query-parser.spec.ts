import { mockNext, mockRequest, mockResponse } from '@app/shared/utils/helper/test-utils';
import { queryParserHandler } from '@app/shared/middleware';

describe('test query-parser middleware', () => {
  test('should set a query object in req.query', async () => {
    // arrange
    const url = '/dummy?q={"_id": {"$in":["xxxx"]}}';
    const params = { url };
    const req = mockRequest(params);
    const res = mockResponse();
    const next = mockNext();
    // act
    queryParserHandler(req, res, next);
    // assert
    expect(req.query).toMatchObject({ _id: { $in: ['xxxx'] } });
  });
  test('should not set query object in req.query', async () => {
    // arrange
    const url = '/DummyPath';
    const req = mockRequest({ url });
    const res = mockResponse();
    const next = mockNext();
    // act
    queryParserHandler(req, res, next);
    // assert
    expect(req.query).toBeUndefined();
    expect(next).toBeCalledTimes(1);
  });
});
