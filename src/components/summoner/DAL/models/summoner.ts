import { Legend, Skill } from '@app/components/legend/DAL/models';

export interface Summoner {
  id: number;
  name: string;
  firstname: string;
  description: string;
  malePic: string;
  femalePic: string;
  currPosition: string;
  isTurningPhase: boolean;
  legacyEnergy: number;
  currAA: number;
  currTA: number;
  skills: Skill[];
  summon: Legend;
}
