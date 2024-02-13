import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '@app/shared/container/types';

import { DummyController } from '@app/components/dummyComponent/controller/dummy.controller';
import { mockNext, mockRequest, mockResponse } from '@app/shared/utils/helper/test-utils';

describe('Unit test Controller', () => {
  let mockContainer: Container;
  let dummyServiceStub: any;
  let dummyController: DummyController;
  beforeEach(() => {
    jest.clearAllMocks();
    mockContainer = new Container();
    dummyServiceStub = jest.fn();

    mockContainer.bind(TYPES.DummyController).to(DummyController);
    mockContainer.bind(TYPES.DummyService).toConstantValue(dummyServiceStub);
    mockContainer.bind(TYPES.DummyFactory).toConstantValue(dummyServiceStub);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('DummyComponent/ Controller Methods', () => {
    test('findDummyDataById: should success', async () => {
      // arrange
      const args = {};
      const req = mockRequest(args);
      const res = mockResponse();
      const next = mockNext();
      dummyController = mockContainer.get(TYPES.DummyController);
      dummyServiceStub.findDummyDataById = jest.fn().mockResolvedValue(args);
      // act
      await dummyController.findDummyDataById(req, res, next);
      // assert
      expect(dummyServiceStub.findDummyDataById).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
