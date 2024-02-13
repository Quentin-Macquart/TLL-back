import { ICRUD } from '@app/shared/crud';
import { Party, DynamicStatistics } from '@app/components/party/DAL/models';

export interface IParty extends ICRUD<Party> {
  findParties(): Promise<Party[]>;
  findPartyById(id: string): Promise<Party>;
  createParty(body: any): Promise<Party>;
  updateParty(id: string, body: Party): Promise<Party>;
  updateStatistics(id: string, body: DynamicStatistics): Promise<Party>;
  deleteParty(id: string): Promise<void>;
}
