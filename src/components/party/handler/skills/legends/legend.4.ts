import { LegendSkills } from '@app/components/party/handler';
import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { SkillCalculator } from '../skills.calculator';

export class Apollon extends LegendSkills {
  skillCalculator = new SkillCalculator();

  constructor() {
    super(4);
  }

  public castSkill(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, skill: Skill): void {
    switch (skill.number) {
      case 1:
        this.skillCalculator.dmgTo(
          correspSummoners.emittor,
          correspSummoners.receptors[0],
          skill,
          'case-number',
        );
        break;
      case 2:
        this.skillCalculator.dmgTo(correspSummoners.emittor, correspSummoners.receptors[0], skill);
        break;
      case 3:
        break;
      default:
    }
  }
}
