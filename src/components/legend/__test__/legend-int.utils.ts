import express, { NextFunction, Request, Response } from 'express';

import TYPES from '@app/shared/container/types';
import { applyMiddlewares, applyRoutes } from '@app/shared/utils/helper/route-helper';
import { errorHandler } from '@app/shared/middleware';
import middleware from '@app/shared/middleware/middleware';
import { LegendController } from '@app/components/legend/controller/legend.controller';

/**
 * we redefine the routes here to set the controllers with stub repository
 * the rebind method in container object is not working
 * @param {LegendController} legendController
 */
const getRoutes = (legendController: LegendController) => {
  return [
    {
      path: '/legends',
      method: 'get',
      handler: async (req: Request, res: Response, next: NextFunction) =>
        legendController.findLegends(req, res, next),
    },
    {
      path: '/legend/:id',
      method: 'get',
      handler: async (req: Request, res: Response, next: NextFunction) =>
        legendController.findLegendById(req, res, next),
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
  const legendController = container.get(TYPES.LegendController);
  applyRoutes(getRoutes(legendController), app);

  // error handling
  applyMiddlewares([errorHandler], app);
  return app;
};
