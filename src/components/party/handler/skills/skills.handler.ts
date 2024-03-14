import { logger } from '@app/shared/utils/logger';
import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { DynamicStatistics, Party } from '@app/components/party/DAL/models';
import { SkillCalculator } from './skills.calculator';
import { LegendsSkillsHandler } from './legends.handler';

export class SkillsHandler {
  private readonly skillCalculator: SkillCalculator;

  private readonly legendSkill: LegendsSkillsHandler;

  // private readonly summonerSkill: SummonerSkillsHandler;

  constructor() {
    this.skillCalculator = new SkillCalculator();
    this.legendSkill = new LegendsSkillsHandler(this.skillCalculator);
    // this.summonerSkill = new SummonerSkillsHandler(this.skillCalculator)
  }

  /**
   * Manages the activation of skills for the emittor and applies effects to the receptors based on the dynamic statistics provided. This function determines which skill is used by the emittor, logs the skill usage, and activates the appropriate effects on the emittor and receptors.
   *
   * @param {{emittor: Summoner; receptors: Summoner[]}} correspSummoners - An object containing the emittor and receptors within the context of the current action. The emittor is the summoner performing the action, and receptors are the summoners affected by the action.
   * @param {DynamicStatistics} body - An object containing the statistics that influence the execution of the skill, including the skill number and whether it's a legend skill.
   * @returns {{emittor: Summoner; receptors: Summoner[]}} The correspSummoners object potentially modified with updated statistics after skill activation.
   */
  public manage(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, body: DynamicStatistics) {
    const { skillNumb, isLegendSkill } = body;
    const skillsList: Skill[] = isLegendSkill
      ? correspSummoners.emittor.summon.skills
      : correspSummoners.emittor.skills;
    const skillUsed = skillsList.find((skill: Skill) => skill.number === skillNumb);

    if (skillUsed) {
      this.logSkillUsage(correspSummoners.emittor, skillUsed);
      if (isLegendSkill) {
        this.legendSkill.activate(correspSummoners, skillUsed);
      } else {
        // this.summonerSkill.activate(correspSummoners, skillUsed);
      }
    }
    return correspSummoners;
  }

  /**
   * Logs the usage of a skill by the emittor. This function constructs a log message indicating which summoner (emittor) used which skill, and logs it for monitoring and debugging purposes.
   *
   * @param {Summoner} emittor - The summoner who is using the skill.
   * @param {Skill} skillUsed - The skill that is being used by the emittor.
   */
  public logSkillUsage(emittor: Summoner, skillUsed: Skill) {
    const user = emittor.summon
      ? `${emittor.summon.shortcut} (${emittor.summon.name})`
      : `La legacy ${emittor.name}`;
    logger.info(`${user} utilise sa compétence ${skillUsed.number} : ${skillUsed.name}`);
  }
}
