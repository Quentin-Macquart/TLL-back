import { LegendSkills } from '@app/components/party/handler';
import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { SkillCalculator } from '../skills.calculator';

export class Miyamoto extends LegendSkills {
  skillCalculator = new SkillCalculator();

  constructor() {
    super(3);
  }

  /**
   * Executes the skill effect based on the skill's unique identifier. This function determines the specific actions to take for each skill, such as applying damage, altering stats, or other game mechanics, based on the skill number. It uses a switch statement to differentiate between the behaviors of various skills.
   *
   * @param {{ emittor: Summoner; receptors: Summoner[] }} correspSummoners - An object containing the emittor and the receptors within the context of the current action. The emittor is the summoner performing the action (using the skill), and the receptors are the summoners who are affected by the skill.
   * @param {Skill} skill - The skill object being cast, which contains details like the skill number that determines the specific logic to execute.
   * @returns {void} This function does not return a value.
   */
  public castSkill(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, skill: Skill): void {
    switch (skill.number) {
      case 1:
        this.skillCalculator.updateDefense(correspSummoners.emittor, skill);
        this.skillCalculator.updateAttack(correspSummoners.emittor, skill);
        break;
      case 2:
        this.skillCalculator.dmgTo(correspSummoners.emittor, correspSummoners.receptors[0], skill);
        // this.skillCalculator.additionalDmgWithStatus(correspSummoners.receptors[0], skill]);
        break;
      case 3:
        break;
      default:
    }
  }
}
