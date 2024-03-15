import { Skill } from '@app/components/legend/DAL/models/skill';
import { Stats } from '@app/components/legend/DAL/models/statistics';

export interface Legend {
  id: number;
  name: string;
  shortcut: string;
  orderId: number;
  order: string;
  lore: string;
  picStart: string;
  picReveal: string;
  picVictory: string;
  passive: string;
  status: { status: string; turnsLeft: number }[];
  sex: string;
  stats: Stats;
  skills: Skill[];
}
