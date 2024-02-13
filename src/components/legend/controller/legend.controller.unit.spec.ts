import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '@app/shared/container/types';

import { LegendController } from '@app/components/legend/controller/legend.controller';
import { mockNext, mockRequest, mockResponse } from '@app/shared/utils/helper/test-utils';

describe('Unit test Controller', () => {
  let mockContainer: Container;
  let dummyServiceStub: any;
  let legendController: LegendController;
  beforeEach(() => {
    jest.clearAllMocks();
    mockContainer = new Container();
    dummyServiceStub = jest.fn();

    mockContainer.bind(TYPES.LegendController).to(LegendController);
    mockContainer.bind(TYPES.LegendService).toConstantValue(dummyServiceStub);
    mockContainer.bind(TYPES.LegendFactory).toConstantValue(dummyServiceStub);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('LegendController/ Controller Methods', () => {
    test('method s name: should success', async () => {
      // arrange
      const args = {};
      const req = mockRequest(args);
      const res = mockResponse();
      const next = mockNext();
      legendController = mockContainer.get(TYPES.LegendController);
      dummyServiceStub.findLegendById = jest.fn().mockResolvedValue(args);
      // act
      await legendController.findLegendById(req, res, next);
      // assert
      expect(dummyServiceStub.findLegendById).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
