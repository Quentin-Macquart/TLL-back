import { Summoner } from '@app/components/summoner/DAL/models';
import { DynamicStatistics } from '@app/components/party/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';

export class SkillCalculator {
  /**
   *
   * @param correspSummoners
   */
  dmgTo(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, skill: Skill): void {
    const { emittor, receptors } = correspSummoners;
    receptors.forEach((receptor: Summoner) => {
      receptor.summon.stats.lifepoints -= emittor.summon.stats.att * skill.coeff - receptor.summon.stats.def;
    });
  }

  recovery(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    body: DynamicStatistics,
    skillUsed: Skill,
  ) {
    // Implement recovery logic
  }

  inflictStatus(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    body: DynamicStatistics,
    skillUsed: Skill,
  ) {
    // Implement inflict status logic
  }

  recievingStatus(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    body: DynamicStatistics,
    skillUsed: Skill,
  ) {
    // Implement receiving status logic
  }
}
