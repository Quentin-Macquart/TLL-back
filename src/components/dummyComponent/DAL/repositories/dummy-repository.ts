import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { DummyFactory } from '@app/components/dummyComponent/DAL/factories/dummy-factory-data';
import { IDummyInterface } from '@app/components/dummyComponent/DAL/interfaces/IDummyInterface';
import { DummyApi } from '@app/components/dummyComponent/DAL/request/dummy-request';

@injectable()
export class DummyRepository implements IDummyInterface {
  constructor(
    @inject(TYPES.DummyFactory) private readonly dummyFactory: DummyFactory,
    @inject(TYPES.DummyApi) private readonly dummyApi: DummyApi,
  ) {
    this.dummyFactory = dummyFactory;
    this.dummyApi = dummyApi;
  }

  /** Get the corresponding DummyData
   *
   * @param {number} id
   * @returns {Promise<DummyModel>}
   */
  public async findDummyDataById(id: string): Promise<any> {
    const dummyData = await this.dummyApi.findById(id);
    return this.dummyFactory.buildDummyData(dummyData);
  }

  /** Read/Create DummyData (POST)
   *
   * @param {number} id
   * @param {body} object
   * @returns {Promise<any>}
   */
  public async createDummyData(id: string, body: object): Promise<any> {
    return this.dummyApi.create(id, body);
  }

  /** Update dummy data (put)
   *
   * @param {string} id
   * @param {any} body
   * @returns {Promise<any>}
   */
  public async updateDummyData(id: string, body) {
    return this.dummyApi.update(id, body);
  }

  /** Del dummyData by id
   *
   * @param {string} id
   * @returns {Promise<object>}
   */
  public async deleteDummyData(id: string): Promise<void> {
    return this.dummyApi.delete(id);
  }
}
