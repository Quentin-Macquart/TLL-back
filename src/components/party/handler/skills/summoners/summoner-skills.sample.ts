import { Skill } from '@app/components/legend/DAL/models';
import { Board } from '@app/components/party/DAL/models';
import { Summoner } from '@app/components/summoner/DAL/models';

export class SummonerSkills {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  /**
   * Executes the skill effect based on the skill's unique identifier. This function determines the specific actions to take for each skill, such as applying damage, altering stats, or other game mechanics, based on the skill number. It uses a switch statement to differentiate between the behaviors of various skills.
   *
   * @param {{ emittor: Summoner; receptors: Summoner[] }} correspSummoners - An object containing the emittor and the receptors within the context of the current action. The emittor is the summoner performing the action (using the skill), and the receptors are the summoners who are affected by the skill.
   * @param {Skill} skill - The skill object being cast, which contains details like the skill number that determines the specific logic to execute.
   * @returns {void} This function does not return a value.
   */
  public castSkill(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    skill: Skill,
    board?: Board,
    caseName?: string,
  ): void {}
}
