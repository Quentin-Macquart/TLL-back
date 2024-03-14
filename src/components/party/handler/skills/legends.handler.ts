import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { SkillCalculator } from './skills.calculator';

export class LegendsSkillsHandler {
  private skillCalculator: SkillCalculator;

  constructor(skillCalculator: SkillCalculator) {
    this.skillCalculator = skillCalculator;
  }

  activate(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, skill: Skill) {
    const { emittor } = correspSummoners;
    const legendSkillCombine: string = `${emittor.summon.id}:${skill.number}`;

    switch (legendSkillCombine) {
      // Legend 1
      case '1:1':
        this.skillCalculator.applicateSkillToAllReceptors(correspSummoners, skill, 'case-number');
        break;
      case '1:2':
        this.skillCalculator.applicateSkillToAllReceptors(correspSummoners, skill);
        break;
      case '1:3':
        break;

      // Legend 2
      case '2:1':
        break;
      case '2:2':
        break;
      case '2:3':
        break;

      // Legend 3
      case '3:1':
        break;
      case '3:2':
        break;
      case '3:3':
        break;

      // Legend 4
      case '4:1':
        break;
      case '4:2':
        break;
      case '4:3':
        break;

      // Legend 5
      case '5:1':
        break;
      case '5:2':
        break;
      case '5:3':
        break;

      // Legend 6
      case '6:1':
        break;
      case '6:2':
        break;
      case '6:3':
        break;

      // Legend 7
      case '7:1':
        this.skillCalculator.applicateSkillToAllReceptors(correspSummoners, skill);
        break;
      case '7:2':
        break;
      case '7:3':
        break;

      // Legend 8
      case '8:1':
        break;
      case '8:2':
        this.skillCalculator.applicateSkillToAllReceptors(correspSummoners, skill);
        break;
      case '8:3':
        break;

      // Legend 9
      case '9:1':
        break;
      case '9:2':
        break;
      case '9:3':
        break;

      // Legend 10
      case '10:1':
        break;
      case '10:2':
        break;
      case '10:3':
        break;

      // Legend 11
      case '11:1':
        break;
      case '11:2':
        break;
      case '11:3':
        break;

      // Legend 12
      case '12:1':
        break;
      case '12:2':
        break;
      case '12:3':
        break;

      // Legend 13
      case '13:1':
        break;
      case '13:2':
        break;
      case '13:3':
        break;

      // Legend 14
      case '14:1':
        break;
      case '14:2':
        break;
      case '14:3':
        break;

      // Legend 15
      case '15:1':
        break;
      case '15:2':
        break;
      case '15:3':
        break;

      // Legend 16
      case '16:1':
        break;
      case '16:2':
        break;
      case '16:3':
        break;

      // Legend 17
      case '17:1':
        break;
      case '17:2':
        break;
      case '17:3':
        break;

      // Legend 18
      case '18:1':
        break;
      case '18:2':
        break;
      case '18:3':
        break;

      // Legend 19
      case '19:1':
        break;
      case '19:2':
        break;
      case '19:3':
        break;

      // Legend 20
      case '20:1':
        break;
      case '20:2':
        break;
      case '20:3':
        break;

      // Legend 21
      case '21:1':
        break;
      case '21:2':
        break;
      case '21:3':
        break;

      default:
        // Handle case where no match is found
        break;
    }
  }
}
