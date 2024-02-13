import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { SummonerFactory } from '@app/components/summoner/DAL/factories/summoner-factory';
import { SummonerApi } from '@app/components/summoner/DAL/request/summoner-request';
import { Summoner } from '@app/components/summoner/DAL//models';
import { ISummoner } from '@app/components/summoner/DAL/interfaces/summoner-interface';

@injectable()
export class SummonerRepository implements ISummoner {
  constructor(
    @inject(TYPES.SummonerFactory) private readonly summonerFactory: SummonerFactory,
    @inject(TYPES.SummonerApi) private readonly summonerApi: SummonerApi,
  ) {
    this.summonerFactory = summonerFactory;
    this.summonerApi = summonerApi;
  }

  /** Get all summoners information
   *
   *
   * @returns {Promise<Summoner[]>}
   */
  public async findAll(): Promise<Summoner[]> {
    return this.summonerApi.find();
  }

  /** Get summoner info by id
   *
   * @param {number} id
   * @returns {Promise<Summoner>}
   */
  public async findById(id: string): Promise<Summoner> {
    return this.summonerApi.findById(id);
  }
}
