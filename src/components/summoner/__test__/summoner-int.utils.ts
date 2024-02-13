import express, { NextFunction, Request, Response } from 'express';

import TYPES from '@app/shared/container/types';
import { applyMiddlewares, applyRoutes } from '@app/shared/utils/helper/route-helper';
import { errorHandler } from '@app/shared/middleware';
import middleware from '@app/shared/middleware/middleware';
import { SummonerController } from '@app/components/summoner/controller/summoner.controller';

/**
 * we redefine the routes here to set the controllers with stub repository
 * the rebind method in container object is not working
 * @param {SummonerController} summonerController
 */
const getRoutes = (summonerController: SummonerController) => {
  return [
    {
      path: '/summoners',
      method: 'get',
      handler: async (req: Request, res: Response, next: NextFunction) =>
        summonerController.findSummoners(req, res, next),
    },
    {
      path: '/summoners/:id',
      method: 'get',
      handler: async (req: Request, res: Response, next: NextFunction) =>
        summonerController.findSummonerById(req, res, next),
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
  const summonerController = container.get(TYPES.SummonerController);
  applyRoutes(getRoutes(summonerController), app);

  // error handling
  applyMiddlewares([errorHandler], app);
  return app;
};
