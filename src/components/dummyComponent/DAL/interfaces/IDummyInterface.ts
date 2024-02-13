import { ICRUD } from '@app/shared/crud';
import { DummyModel } from '@app/components/dummyComponent/DAL/models';

export interface IDummyInterface extends ICRUD<DummyModel> {
  // Business side
  findDummyDataById(id: string): Promise<any>;
  createDummyData(id: string, body: any): Promise<any>;
  updateDummyData(id: string, body: any): Promise<void>;
  deleteDummyData(id: string): Promise<void>;
}
