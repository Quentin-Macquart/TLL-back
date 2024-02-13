import { ICRUD } from '@app/shared/crud';
import { Legend } from '@app/components/legend/DAL/models';

export interface ILegend extends ICRUD<Legend> {
  findAll(): Promise<Legend[]>;
  findById(id: string): Promise<Legend>;
}
