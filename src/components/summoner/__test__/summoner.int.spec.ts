import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from '@app/shared/container/types';
import { getMockApp } from '@app/components/dummyComponent/__test__/dummy-int.utils';
import { SummonerController } from '@app/components/summoner/controller/summoner.controller';

describe('Utils controllers unit tests', () => {
  let appMock: any;
  let dummyServiceStub;
  let mockContainer;
  beforeAll(() => {
    mockContainer = null;
    mockContainer = new Container();
    dummyServiceStub = jest.fn();

    mockContainer.bind(TYPES.SummonerService).toConstantValue(dummyServiceStub);
    mockContainer.bind(TYPES.SummonerController).to(SummonerController);
    appMock = getMockApp(mockContainer);
  });
  afterAll(() => {
    jest.clearAllMocks();
    mockContainer = null;
  });
});
