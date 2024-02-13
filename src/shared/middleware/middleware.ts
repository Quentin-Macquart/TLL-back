import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import { Application, NextFunction } from 'express';
import helmet from 'helmet';
import { queryParser } from '@app/shared/middleware/query-parser/query-parser';
import { logger } from '@app/shared/utils/logger';

const swaggerDocument = require('../../../swagger.json');

/**
 * Body request parsing function
 * @param {Application} app
 */
export const handleBodyRequestParsing = (app: Application) => {
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());
};

// parser for json query
export const handleQueryParsing = queryParser;

export const handleCors = (app: Application) => app.use(cors({ credentials: true, origin: true }));

export const handleCompression = (app: Application) => {
  app.use(compression());
};

export const handleHelmet = (app: Application) => {
  app.use(helmet());
};

/**
 * Documentation of the APIs
 * @param {Application} app
 */
export const handleDocs = (app: Application) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(
      '/explorer',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, {
        explorer: true,
        swaggerOptions: {
          displayRequestDuration: true,
        },
      }),
    );
  }
};

/**
 * Function that log request start
 * @param req
 * @param res
 * @param {NextFunction} next
 */
const logRequestStart = (req, res, next: NextFunction) => {
  const requestStart = Date.now();

  res.on('finish', () => {
    const { method, url } = req;
    if (
      (res.statusCode.toString().match(/^4/) || {}).input ||
      (res.statusCode.toString().match(/^5/) || {}).input
    ) {
      logger.error(`On ${method} ${url}`);
      logger.error(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
      logger.error(`processingTime: ${Date.now() - requestStart} ms`);
    } else {
      logger.info(`${method} ${url}`);
      logger.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
      logger.info(`processingTime: ${Date.now() - requestStart} ms`);
    }
  });
  next();
};

/**
 * Handler for logs
 * @param {Application} app
 */
export const handleLogs = (app: Application) => {
  app.use(logRequestStart);
};

export default [
  handleBodyRequestParsing,
  handleQueryParsing,
  handleCors,
  handleCompression,
  handleDocs,
  handleLogs,
  handleHelmet,
];
