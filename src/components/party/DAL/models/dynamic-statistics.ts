import { StatusConfig } from '@app/components/legend/DAL/models';

export interface Injury {
  giveStatus: StatusConfig[];
  damages: number[];
}

export interface Benefit {
  receiveStatus: StatusConfig[];
  benefits: number[];
}

export interface DynamicStatistics {
  isLegendSkill: boolean;
  from: number;
  skillNumb: number;
  to: number[];
}
