import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { getPort } from '@app/shared/utils';
import { applyMiddlewares, applyRoutes } from '@app/shared/utils/helper/route-helper';
import { errorHandler, HTTP404Error } from '@app/shared/middleware';
import middleware from '@app/shared/middleware/middleware';
import { HttpStatusCode } from '@app/shared/middleware/error-handler/http-errors';

// Components Routes
import dummyRoutes from '@app/components/dummyComponent/dummyComponent.router';
import legendRoutes from '@app/components/legend/legend.router';
import summonersRoutes from '@app/components/summoner/summoner.router';
import partyRoutes from '@app/components/party/party.router';

const { NODE_ENV } = process.env;

require('dotenv').config({
  path: path.resolve(__dirname, '../', `.env.${process.env.NODE_ENV || 'local'}`),
});

// create Express server
const app = express();

// middlewares
applyMiddlewares(middleware, app);

// configure routes
applyRoutes(dummyRoutes, app);
applyRoutes(legendRoutes, app);
applyRoutes(summonersRoutes, app);
applyRoutes(partyRoutes, app);

app.get('/', (_req, res) => {
  res.send({
    statusCode: HttpStatusCode.SUCCESS,
    message: `Hello! Server is running with node ${NODE_ENV}, version: ${process.env.npm_package_version}`,
  });
});

app.use((err, _req, res, _next) => {
  err.statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    name: err.name,
    status: err.status || 'error',
    statusCode: err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR,
    externalStatusCode: err.externalStatusCode,
    message: err.message,
  });
});

app.all('*', (req, _res, next) => {
  const err = new HTTP404Error(`Can't find ${req.originalUrl} on this server!`); // Tells us which IP tried to reach a particular URL
  next(err);
});

// Error handling
applyMiddlewares([errorHandler], app);

// Finally, let's set the port
const port = getPort();
app.set('port', port);
export default app;
