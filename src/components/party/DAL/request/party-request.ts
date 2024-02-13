import { injectable } from 'inversify';
import { MongoDbApi } from '@app/shared/utils/request/mongo-request';
import { errorLogger } from '@app/shared/utils/logger';
import { handleDaataServerError } from '@app/shared/utils';
import { Party } from '@app/components/party/DAL/models';

@injectable()
export class PartyApi extends MongoDbApi {
  constructor(dbUrl: string, dbName: string, collection: string) {
    super(dbUrl, dbName, collection);
  }

  /** Get party
   *
   * @returns {Promise<Party>}
   */
  public async find(): Promise<Party[]> {
    try {
      const legends = await this.read();
      return legends;
    } catch (error) {
      errorLogger.error('Erreur lors de la récupération des légendes:', error);
      return handleDaataServerError(error);
    }
  }

  /** Get party by id
   *
   * @returns {Promise<Party>}
   */
  public async findById(id: string): Promise<Party> {
    try {
      const legend = await this.readOne(id);

      if (!legend) {
        throw new Error('Cannot find the current legend');
      }

      return legend;
    } catch (error) {
      errorLogger.error('The reading of the Id is not possible', error);
      return handleDaataServerError(error);
    }
  }
}
