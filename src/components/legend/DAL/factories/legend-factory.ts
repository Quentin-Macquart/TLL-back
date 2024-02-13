import { Legend } from '@app/components/legend/DAL/models/index';
import { injectable } from 'inversify';

@injectable()
export class LegendFactory {
  /**  Build necessary data based on Legend model
   *
   * @param {Legend} legends
   * @returns {Promise<Legend>}
   */
  public async buildDummyData(legends: Legend): Promise<Legend> {
    return legends;
  }
}
