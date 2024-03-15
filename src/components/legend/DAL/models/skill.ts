import { StatusConfig } from '@app/components/legend/DAL/models/statistics';

interface Cost {
  LE: number;
  TA: boolean;
  AA: boolean;
  actionNb: number;
}

export interface Skill {
  number: number;
  name: string;
  type: string;
  desc: string;
  cd: number;
  recov: number;
  coeff: number;
  addCost: number;
  effect: string[];
  givingStatus: StatusConfig;
  recievingStatus: StatusConfig;
  cost: Cost;
}
