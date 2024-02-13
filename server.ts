import http from 'http';
import app from '@app/app';
import { errorLogger, logger } from '@app/shared/utils/logger';

const { NODE_ENV } = process.env;

(async () => {
  try {
    // Connect to datasource
    // await connectDB();
    // logger.info('Successfully connected to datasource.');

    // Handle exceptions and rejections
    process.on('uncaughtException', e => {
      errorLogger.error(e);
      logger.info(e);
    });

    process.on('unhandledRejection', e => {
      errorLogger.error(e);
      logger.info(e);
    });

    // Create and start HTTP server
    const server = http.createServer(app);
    server.listen(app.get('port'), () => {
      logger.info(`App is running on ${NODE_ENV || 'local'} at http://localhost:${app.get('port')}/explorer`);
      logger.info('Press Ctrl + C to stop\n');
    });
  } catch (error) {
    // errorLogger.error(`Failed to connect to MongoDB: ${(error as Error).message}`);
    // process.exit(1);
  }
})();
