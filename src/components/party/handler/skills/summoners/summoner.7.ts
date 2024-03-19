import { LegendSkills } from '@app/components/party/handler';
import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { Board } from '@app/components/party/DAL/models';
import { SkillCalculator } from '../skills.calculator';

export class Valhjart extends LegendSkills {
  skillCalculator = new SkillCalculator();

  constructor() {
    super(7);
  }

  /**
   * Executes the skill effect based on the skill's unique identifier. This function determines the specific actions to take for each skill, such as applying damage, altering stats, revealing a board case, or other game mechanics, based on the skill number. It uses a switch statement to differentiate between the behaviors of various skills.
   *
   * @param {{ emittor: Summoner; receptors: Summoner[] }} correspSummoners - An object containing the emittor and the receptors within the context of the current action. The emittor is the summoner performing the action (using the skill), and the receptors are the summoners who are affected by the skill.
   * @param {Skill} skill - The skill object being cast, which contains details like the skill number that determines the specific logic to execute.
   * @param {Board} board - The board on which the game is played, relevant for skills that interact with the game's board.
   * @param {string} caseName - The name or identifier of the board case that is targeted or affected by the skill.
   * @returns {void} This function does not return a value.
   */
  public castSkill(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    skill: Skill,
    board: Board,
    caseName: string,
  ): void {
    // this.skillCalculator.consumeTA(skill.cost.actionNb);
    switch (skill.number) {
      case 1:
        this.skillCalculator.revealOneCase(board, caseName);
        break;
      case 2:
        this.skillCalculator.recoverLP(correspSummoners.emittor, skill);
        break;
      case 3:
        // this.skillCalculator.recoverHalfMissingLP(correspSummoners.emittor, skill);
        break;
      default:
    }
  }
}
