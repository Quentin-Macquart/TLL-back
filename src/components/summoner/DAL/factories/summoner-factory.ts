import { injectable } from 'inversify';
import { Summoner } from '@app/components/summoner/DAL/models';

@injectable()
export class SummonerFactory {
  /**  Build necessary data based on Summoner model
   *
   * @param {Summoner} dummyData
   * @returns {Promise<Summoner>}
   */
  public async buildDummyData(dummyData: Summoner): Promise<Summoner> {
    return dummyData;
  }
}
