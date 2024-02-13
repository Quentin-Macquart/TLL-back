import { injectable } from 'inversify';
import { Legend } from '@app/components/legend/DAL/models';
import { MongoDbApi } from '@app/shared/utils/request/mongo-request';
import { errorLogger } from '@app/shared/utils/logger';
import { handleDaataServerError } from '@app/shared/utils';

@injectable()
export class LegendApi extends MongoDbApi {
  constructor(dbUrl: string, dbName: string, collection: string) {
    super(dbUrl, dbName, collection);
  }

  /** Get legends
   *
   * @returns {Promise<Legend[]>}
   */
  public async find(): Promise<Legend[]> {
    try {
      const legends = await this.read();
      return legends;
    } catch (error) {
      errorLogger.error('Erreur lors de la récupération des légendes:', error);
      return handleDaataServerError(error);
    }
  }

  /** Get legend by id
   *
   * @returns {Promise<Legend>}
   */
  public async findById(id: string): Promise<Legend> {
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
