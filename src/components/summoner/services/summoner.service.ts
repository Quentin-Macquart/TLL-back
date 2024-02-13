import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from '@app/shared/container/types';
import { ISummoner } from '@app/components/summoner/DAL/interfaces/summoner-interface';
import { Summoner } from '@app/components/summoner/DAL/models';

@injectable()
export class SummonerService {
  constructor(@inject(TYPES.ISummoner) private readonly summonerRepository: ISummoner) {
    this.summonerRepository = summonerRepository;
  }

  /** Get all summoners
   *
   *
   * @returns {Summoners}
   */
  public async findSummoners(): Promise<Summoner[]> {
    return this.summonerRepository.findAll();
  }

  /** Get one summoner by Id
   *
   * @param {string} id
   * @returns {Summoner}
   */
  public async findSummonerById(id: string): Promise<Summoner> {
    return this.summonerRepository.findById(id);
  }
}
