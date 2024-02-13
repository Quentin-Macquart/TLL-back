import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '@app/shared/container/types';

import { SummonerController } from '@app/components/summoner/controller/summoner.controller';
import { mockNext, mockRequest, mockResponse } from '@app/shared/utils/helper/test-utils';

describe('Unit test Controller', () => {
  let mockContainer: Container;
  let dummyServiceStub: any;
  let summonerController: SummonerController;
  beforeEach(() => {
    jest.clearAllMocks();
    mockContainer = new Container();
    dummyServiceStub = jest.fn();

    mockContainer.bind(TYPES.SummonerController).to(SummonerController);
    mockContainer.bind(TYPES.SummonerService).toConstantValue(dummyServiceStub);
    mockContainer.bind(TYPES.SummonerFactory).toConstantValue(dummyServiceStub);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('SummonerController/ Controller Methods', () => {
    test('method s name: should success', async () => {
      // arrange
      const args = {};
      const req = mockRequest(args);
      const res = mockResponse();
      const next = mockNext();
      summonerController = mockContainer.get(TYPES.SummonerController);
      dummyServiceStub.findSummonerById = jest.fn().mockResolvedValue(args);
      // act
      await summonerController.findSummonerById(req, res, next);
      // assert
      expect(dummyServiceStub.findSummonerById).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
