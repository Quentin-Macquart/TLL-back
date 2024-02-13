import { Application, NextFunction, Request, Response } from 'express';
import { Route, Wrapper } from '@app/shared/utils/helper/types';

export const asyncMiddleware = fn => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const applyMiddlewares = (middlewares: Wrapper[], app: Application) => {
  middlewares.forEach(f => f(app));
};

export const applyRoutes = (routes: Route[], app: Application) => {
  routes.forEach(route => {
    const { method, path, handler, validator } = route;
    if (validator) {
      app[method](path, validator, asyncMiddleware(handler));
    } else {
      app[method](path, asyncMiddleware(handler));
    }
  });
};
