import { Request, Response, NextFunction, Application } from 'express';
import {
  HTTP400Error,
  HTTP401Error,
  HTTP403Error,
  HTTP404Error,
  HTTPClientError,
  HttpStatusCode,
} from '@app/shared/middleware';
import { errorLogger } from '@app/shared/utils/logger';

/**
 * Get error object
 * @param {string} name
 * @param {number} statusCode
 * @param {string} message
 * @param {string} code
 * @returns
 */
const getError = (name: string, statusCode: number, message: string, code?: string) => {
  let err: any = {
    status: 'error',
    statusCode,
    name,
    message,
  };
  if (code) {
    err = { ...err, code };
  }
  return err;
};

/**
 * Helpers for handle errors functions
 */
export const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

export const inputError = () => {
  const e = new HTTP400Error('Input error.');
  errorLogger.error(e);
  throw e;
};

export const unauthorizedError = () => {
  const e = new HTTP401Error('Unauthorized.');
  errorLogger.error(e);
  throw e;
};

export const forbiddenError = () => {
  const e = new HTTP403Error('Forbidden.');
  errorLogger.error(e);
  throw e;
};

/**
 * Handle function for client error
 * @param {HTTPClientError} err
 * @param {Response} res
 * @param {NextFunction} next
 */
export const clientError = (err: HTTPClientError, res: Response, next: NextFunction) => {
  // catch only client errors
  if (err.name === 'ClientError') {
    const error = getError('ClientError', err.statusCode, err.message, err.code);
    if (process.env.NODE_ENV !== 'production') {
      error.error = err.stack;
    }
    errorLogger.error(error);
    res.status(err.statusCode).json(error);
  } else {
    next(err);
  }
};

/**
 * Handle function for server error
 * @param {Error} err
 * @param {Response} res
 */
export const serverError = (err: Error, res: Response, _next: NextFunction) => {
  const error = getError('ServerError', HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal Server Error');
  if (process.env.NODE_ENV !== 'production') {
    error.error = err.stack;
  }
  errorLogger.error(err);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error);
};

/**
 * Handle functions for errors
 * @param {Application} app
 */
export const handle404Error = (app: Application) => {
  app.use((_req: Request, _res: Response) => {
    notFoundError();
  });
};

export const handle400Error = (app: Application) => {
  app.use((_req: Request, _res: Response) => {
    inputError();
  });
};

export const handle401Error = (app: Application) => {
  app.use((_req: Request, _res: Response) => {
    unauthorizedError();
  });
};

export const handle403Error = (app: Application) => {
  app.use((_req: Request, _res: Response) => {
    forbiddenError();
  });
};

export const handleClientError = (app: Application) => {
  app.use((err: HTTPClientError, _req: Request, res: Response, next: NextFunction) => {
    clientError(err, res, next);
  });
};

export const handleServerError = (app: Application) => {
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    serverError(err, res, next);
  });
};

/**
 * @description middleware to handle errors: httpClientErrors & httpServerErrors
 * @param {Application} app
 */
export const errorHandler = (app: Application) => {
  handle404Error(app);
  handle400Error(app);
  handle401Error(app);
  handle403Error(app);
  handleClientError(app);
  handleServerError(app);
};
