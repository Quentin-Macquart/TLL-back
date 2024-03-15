import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { PartyFactory } from '@app/components/party/DAL/factories/party-factory';
import { IParty } from '@app/components/party/DAL/interfaces/party-interface';
import { PartyApi } from '@app/components/party/DAL/request/party-request';
import { DynamicStatistics, Party, PartyConfig } from '@app/components/party/DAL/models';

@injectable()
export class PartyRepository implements IParty {
  constructor(
    @inject(TYPES.PartyFactory) private readonly partyFactory: PartyFactory,
    @inject(TYPES.PartyApi) private readonly partyApi: PartyApi,
  ) {
    this.partyFactory = partyFactory;
    this.partyApi = partyApi;
  }

  /** Get the current Party
   *
   *
   * @returns {Promise<Party>}
   */
  public async findParties(): Promise<Party[]> {
    return this.partyApi.find();
  }

  /** Get the current Party
   *
   *
   * @returns {Promise<Party>}
   */
  public async findPartyById(id: string): Promise<Party> {
    return this.partyApi.findById(id);
  }

  /** Create Party
   *
   * @param {body} object
   * @returns {Promise<Party>}
   */
  public async createParty(body: PartyConfig): Promise<any> {
    const party = await this.partyFactory.createParty(body);
    return this.partyApi.create(party);
  }

  /** Update Party
   *
   * @param {string} id
   * @param {any} body
   * @returns {Promise<any>}
   */
  public async updateParty(id: string, body: object) {
    return this.partyApi.update(id, body);
  }

  /**
   * Update Party Statistics
   *
   * @param {string} id - The party ID.
   * @param {DynamicStatistics} body - The statistics to update.
   * @returns {Promise<Party>} - The updated party.
   */
  public async updateStatistics(id: string, body: DynamicStatistics): Promise<Party> {
    const currParty: Party = await this.findPartyById(id);
    this.partyFactory.manageStatistics(currParty, body);
    return this.partyApi.update(id, currParty);
  }

  /** Del Party
   *
   * @param {string} id
   * @returns {Promise<object>}
   */
  public async deleteParty(id: string): Promise<void> {
    return this.partyApi.delete(id);
  }
}
