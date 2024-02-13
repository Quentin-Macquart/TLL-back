import express, { NextFunction, Request, Response } from 'express';

import TYPES from '@app/shared/container/types';
import { rules } from '@app/components/dummyComponent/DAL/models/rules/dummy.rules';
import { applyMiddlewares, applyRoutes } from '@app/shared/utils/helper/route-helper';
import { errorHandler, inputValidator } from '@app/shared/middleware';
import middleware from '@app/shared/middleware/middleware';
import { DummyController } from '../controller/dummy.controller';

/**
 * we redefine the routes here to set the controllers with stub repository
 * the rebind method in container object is not working
 * @param {DummyController} dummyController
 */
const getRoutes = (dummyController: DummyController) => {
  return [
    {
      path: '/DummyPath/:id',
      method: 'get',
      handler: async (req: Request, res: Response, next: NextFunction) =>
        dummyController.findDummyDataById(req, res, next),
    },
    {
      path: '/DummyPath/:id',
      method: 'post',
      validator: (req: Request, res: Response, next: NextFunction) =>
        inputValidator(req, res, next, rules, true),
      handler: async (req: Request, res: Response, next: NextFunction) =>
        dummyController.createDummyData(req, res, next),
    },
    {
      path: '/DummyPath/:id',
      method: 'put',
      validator: (req: Request, res: Response, next: NextFunction) =>
        inputValidator(req, res, next, rules, true),
      handler: async (req: Request, res: Response, next: NextFunction) =>
        dummyController.createDummyData(req, res, next),
    },
    {
      path: '/DummyPath/:id',
      method: 'delete',
      handler: async (req: Request, res: Response, next: NextFunction) =>
        dummyController.deleteDummyData(req, res, next),
    },
  ];
};

/**
 * configure a mock app for tests
 * @param {any} container
 * @returns {Express}
 */
export const getMockApp = container => {
  const app = express();

  // middlewares
  applyMiddlewares(middleware, app);

  // configure routes
  const dummyController = container.get(TYPES.DummyController);
  applyRoutes(getRoutes(dummyController), app);

  // error handling
  applyMiddlewares([errorHandler], app);
  return app;
};
