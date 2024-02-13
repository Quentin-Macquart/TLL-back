import { logger, errorLogger } from '@app/shared/utils/logger';
import { MongoClient, Db } from 'mongodb';

require('dotenv').config();

const connectionStr: string = process.env.MONGO_CONNEXION_STRING as string;
const client: MongoClient = new MongoClient(connectionStr);

export const connectDB = async (): Promise<Db | void> => {
  try {
    await client.connect();
    logger.info('Connection on mongoDb has been etablished');
    return client.db();
  } catch (err: any) {
    errorLogger.info(err.message);
    await client.close();
    process.exit(1);
  }
  return undefined;
};
