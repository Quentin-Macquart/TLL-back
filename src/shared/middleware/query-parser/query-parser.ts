import { Request, Response, NextFunction, Application } from 'express';
import { HTTP400Error } from '@app/shared/middleware';
import url = require('url');

/**
 * Parse Query handler
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @throws {HTTP400Error}
 */
export const queryParserHandler = (req: Request, _res: Response, next: NextFunction) => {
  try {
    let { query } = url.parse(req.url);
    if (query && query.startsWith('q=')) {
      const q = query.split('q=')[1];
      query = JSON.parse(decodeURIComponent(q));
      // @ts-ignore
      req.query = query;
    }
    next();
  } catch (e: any) {
    throw new HTTP400Error(e.message);
  }
};

/**
 * Query parser
 * @param {Application} app
 */
export const queryParser = (app: Application) => {
  app.use(queryParserHandler);
};
