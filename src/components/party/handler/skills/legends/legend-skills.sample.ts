import { Skill } from '@app/components/legend/DAL/models';
import { Summoner } from '@app/components/summoner/DAL/models';

export class LegendSkills {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  public castSkill(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, skill: Skill): void {}
}
