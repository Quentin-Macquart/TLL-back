import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { IParty } from '@app/components/party/DAL/interfaces/party-interface';
import { Party } from '@app/components/party/DAL/models';
import { PartyConfig } from '@app/components/party/DAL/models/party-config';
import { DynamicStatistics } from '@app/components/party/DAL/models/dynamic-statistics';

@injectable()
export class PartyService {
  constructor(@inject(TYPES.IParty) private readonly partyRepository: IParty) {
    this.partyRepository = partyRepository;
  }

  /** get Party by id
   *
   *
   * @returns {Promise<Party>}
   */
  public async findParty(): Promise<Party[]> {
    return this.partyRepository.findParties();
  }

  /** Create Party by id
   *
   *
   * @param {PartyConfig} body
   * @returns {Promise<Party>}
   */
  public async createParty(body: PartyConfig) {
    return this.partyRepository.createParty(body);
  }

  /** update Party by id
   *
   * @param {string} id
   * @param {any} body
   * @returns {Promise<Party>}
   */
  public async updateParty(id: string, body: Party) {
    return this.partyRepository.updateParty(id, body);
  }

  /** update Party by id
   *
   * @param {string} id
   * @param {any} body
   * @returns {Promise<Party>}
   */
  public async updateStatistics(id: string, body: DynamicStatistics) {
    return this.partyRepository.updateStatistics(id, body);
  }

  /** delete Party by id
   *
   * @param {string} id
   * @returns {Promise<void>}
   */
  public async deleteParty(id: string) {
    return this.partyRepository.deleteParty(id);
  }
}
