import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { IDummyInterface } from '@app/components/dummyComponent/DAL/interfaces/IDummyInterface';

@injectable()
export class DummyService {
  constructor(@inject(TYPES.IDummyInterface) private readonly dummyRepository: IDummyInterface) {
    this.dummyRepository = dummyRepository;
  }

  /** get dummyData by id
   *
   * @param {string} id
   * @returns {Promise<any>}
   */
  public async findDummyDataById(id): Promise<any> {
    return this.dummyRepository.findDummyDataById(id);
  }

  /** update dummyData by id (POST)
   *
   * @param {string} id
   * @param {any} body
   * @returns {Promise<any>}
   */
  public async createDummyData(id: string, body: object) {
    return this.dummyRepository.createDummyData(id, body);
  }

  /** update dummyData by id (PUT)
   *
   * @param {string} id
   * @param {any} body
   * @returns {Promise<any>}
   */
  public async updateDummyData(id: string, body: object) {
    return this.dummyRepository.updateDummyData(id, body);
  }

  /** delete dummyData by id
   *
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async deleteDummyData(id: string) {
    return this.dummyRepository.deleteDummyData(id);
  }
}
