import express from 'express';
import TYPES from '@app/shared/container/types';
import { applyMiddlewares, applyRoutes } from '@app/shared/utils/helper/route-helper';
import { errorHandler } from '@app/shared/middleware';
import middleware from '@app/shared/middleware/middleware';
import { PartyController } from '@app/components/party/controller/party.controller';

/**
 * we redefine the routes here to set the controllers with stub repository
 * the rebind method in container object is not working
 * @param {PartyController} partyController
 */
const getRoutes = (partyController: PartyController) => {
  return [
    {
      path: '/party',
      method: 'get',
      handler: partyController.findParty.bind(partyController),
    },
    {
      path: '/party',
      method: 'post',
      handler: partyController.createParty.bind(partyController),
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
