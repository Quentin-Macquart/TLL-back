import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from '@app/shared/container/types';
import { DummyController } from '@app/components/dummyComponent/controller/dummy.controller';
import { getMockApp } from '@app/components/dummyComponent/__test__/dummy-int.utils';

describe('Controller units test', () => {
  let appMock: any;
  let dummyServiceStub;
  let mockContainer;
  beforeAll(() => {
    mockContainer = null;
    mockContainer = new Container();
    dummyServiceStub = jest.fn();

    mockContainer.bind(TYPES.DummyService).toConstantValue(dummyServiceStub);
    mockContainer.bind(TYPES.DummyController).to(DummyController);
    appMock = getMockApp(mockContainer);
  });
  afterAll(() => {
    jest.clearAllMocks();
    mockContainer = null;
  });
});
