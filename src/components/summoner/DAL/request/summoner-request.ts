import { injectable } from 'inversify';
import { Summoner } from '@app/components/summoner/DAL/models';
import { MongoDbApi } from '@app/shared/utils/request/mongo-request';
import { errorLogger } from '@app/shared/utils/logger';
import { handleDaataServerError } from '@app/shared/utils';

@injectable()
export class SummonerApi extends MongoDbApi {
  constructor(dbUrl: string, dbName: string, collection: string) {
    super(dbUrl, dbName, collection);
  }

  /** Get summoners
   *
   * @returns {Promise<Summoner[]>}
   */
  public async find(): Promise<Summoner[]> {
    try {
      const summoners = await this.read();
      return summoners;
    } catch (error) {
      errorLogger.error('Erreur lors de la récupération des galadines:', error);
      return handleDaataServerError(error);
    }
  }

  /** Get summoner by id
   *
   * @returns {Promise<Summoner>}
   */
  public async findById(id: string): Promise<Summoner> {
    try {
      const dataFetched = await this.readOne(id);

      if (!dataFetched) {
        throw new Error('Cannot find the current data');
      }
      return dataFetched;
    } catch (error) {
      errorLogger.error('The reading of the Id is not possible', error);
      return handleDaataServerError(error);
    }
  }
}
