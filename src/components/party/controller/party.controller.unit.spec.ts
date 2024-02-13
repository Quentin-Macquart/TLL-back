import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '@app/shared/container/types';

import { PartyController } from '@app/components/party/controller/party.controller';
import { mockNext, mockRequest, mockResponse } from '@app/shared/utils/helper/test-utils';

describe('Unit test Controller', () => {
  let mockContainer: Container;
  let dummyServiceStub: any;
  let partyController: PartyController;
  beforeEach(() => {
    jest.clearAllMocks();
    mockContainer = new Container();
    dummyServiceStub = jest.fn();

    mockContainer.bind(TYPES.PartyController).to(PartyController);
    mockContainer.bind(TYPES.DummyService).toConstantValue(dummyServiceStub);
    mockContainer.bind(TYPES.DummyFactory).toConstantValue(dummyServiceStub);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('PartyComponent/ Controller Methods', () => {
    test('finParty: should success', async () => {
      // arrange
      const args = {};
      const req = mockRequest(args);
      const res = mockResponse();
      const next = mockNext();
      partyController = mockContainer.get(TYPES.PartyController);
      dummyServiceStub.findParty = jest.fn().mockResolvedValue(args);
      // act
      await partyController.findParty(req, res, next);
      // assert
      expect(dummyServiceStub.findParty).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
