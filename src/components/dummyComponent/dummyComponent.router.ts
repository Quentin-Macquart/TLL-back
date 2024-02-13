import { DummyController } from '@app/components/dummyComponent/controller/dummy.controller';
import TYPES from '@app/shared/container/types';
import { NextFunction, Request, Response } from 'express';
import { inputValidator } from '@app/shared/middleware';
import { rules } from '@app/components/dummyComponent/DAL/models/rules/dummy.rules';
import container from '@app/shared/container/container';

const dummyController: DummyController = container.get<DummyController>(TYPES.DummyController);

export default [
  {
    path: '/DummyPath/:id',
    method: 'get',
    handler: dummyController.findDummyDataById.bind(dummyController),
  },
  {
    path: '/DummyPath/:id',
    method: 'post',
    validator: (req: Request, res: Response, next: NextFunction) =>
      inputValidator(req, res, next, rules, true),
    handler: dummyController.createDummyData.bind(dummyController),
  },
  {
    path: '/DummyPath/:id',
    method: 'put',
    validator: (req: Request, res: Response, next: NextFunction) =>
      inputValidator(req, res, next, rules, true),
    handler: dummyController.updateDummyData.bind(dummyController),
  },
  {
    path: '/DummyPath/:id',
    method: 'delete',
    handler: dummyController.deleteDummyData.bind(dummyController),
  },
];
