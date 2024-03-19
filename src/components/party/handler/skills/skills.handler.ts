import { LegendSkills, LegendFactory, SummonerSkills, SummonerFactory } from '@app/components/party/handler';
import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { DynamicStatistics, Party } from '@app/components/party/DAL/models';
import { logger } from '@app/shared/utils/logger';

export class SkillsHandler {
  /**
   * Manages the activation of skills for the emittor and applies effects to the receptors based on the dynamic statistics provided. This function determines which skill is used by the emittor, logs the skill usage, and activates the appropriate effects on the emittor and receptors.
   *
   * @param {{emittor: Summoner; receptors: Summoner[]}} correspSummoners - An object containing the emittor and receptors within the context of the current action. The emittor is the summoner performing the action, and receptors are the summoners affected by the action.
   * @param {DynamicStatistics} body - An object containing the statistics that influence the execution of the skill, including the skill number and whether it's a legend skill.
   * @returns {{emittor: Summoner; receptors: Summoner[]}} The correspSummoners object potentially modified with updated statistics after skill activation.
   */
  public manage(body: DynamicStatistics, party: Party): Party {
    const { emittor, receptors } = this.getEmittorAndReceptors(party, body);

    const { skillNumb, isLegendSkill } = body;
    const skillsList: Skill[] = isLegendSkill ? emittor.summon.skills : emittor.skills;
    const skillUsed = skillsList.find((skill: Skill) => skill.number === skillNumb);

    if (skillUsed) {
      this.logSkillUsage(emittor, skillUsed, isLegendSkill);
      if (isLegendSkill) {
        const legendSkills: LegendSkills = LegendFactory.createLegend(emittor.summon.id);
        legendSkills.castSkill({ emittor, receptors }, skillUsed, party.partyBoard, body.case);
      } else {
        const summonerSkills: SummonerSkills = SummonerFactory.createSummoner(emittor.id);
        summonerSkills.castSkill({ emittor, receptors }, skillUsed, party.partyBoard, body.case);
      }
    }
    return party;
  }

  /**
   * Retrieves the corresponding emittor and receptor summoners based on a party and dynamic statistics.
   * @param {Party} party The party to search within.
   * @param {DynamicStatistics} body The dynamic statistics containing relevant data.
   * @returns An object containing the emittor summoner and an array of receptor summoners.
   */
  getEmittorAndReceptors(
    party: Party,
    body: DynamicStatistics,
  ): { emittor: Summoner; receptors: Summoner[] } {
    const emittor: Summoner = party.partySummoners.filter((summoner: Summoner) => {
      return summoner.id === body.from;
    })[0];

    const receptors: Summoner[] = party.partySummoners.filter((summoner: Summoner) => {
      return body.to.includes(summoner.id);
    });
    return { emittor, receptors };
  }

  /**
   * Logs the usage of a skill by the emilegendttor. This function constructs a log message indicating which summoner (emittor) used which skill, and logs it for monitoring and debugging purposes.
   *
   * @param {Summoner} emittor - The summoner who is using the skill.
   * @param {Skill} skillUsed - The skill that is being used by the emittor.
   */
  public logSkillUsage(emittor: Summoner, skillUsed: Skill, isLegendSkill: boolean) {
    const user = isLegendSkill
      ? `${emittor.summon.shortcut} (${emittor.summon.name})`
      : `La legacy ${emittor.name}`;
    logger.warn(`${user} utilise sa compétence ${skillUsed.number} : ${skillUsed.name}`);
  }
}
