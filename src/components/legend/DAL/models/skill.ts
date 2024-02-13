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
  recup: number;
  coeff: null;
  addCost: null;
  effect: string[];
  givingStatus: StatusConfig;
  recievingStatus: StatusConfig;
  cost: Cost;
}
