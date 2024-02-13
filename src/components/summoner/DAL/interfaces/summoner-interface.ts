import { ICRUD } from '@app/shared/crud';
import { Summoner } from '@app/components/summoner/DAL/models';

export interface ISummoner extends ICRUD<Summoner> {
  findAll(): Promise<Summoner[]>;
  findById(id: string): Promise<Summoner>;
}
