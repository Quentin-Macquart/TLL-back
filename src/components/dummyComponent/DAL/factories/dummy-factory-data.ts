import { DummyModel } from '@app/components/dummyComponent/DAL/models/index';
import { injectable } from 'inversify';

@injectable()
export class DummyFactory {
  /**  Build necessary data based on DummyModel
   *
   * @param {DummyModel} dummyData
   * @returns {Promise<any>}
   */
  public async buildDummyData(dummyData: DummyModel): Promise<any> {
    return dummyData;
  }
}
