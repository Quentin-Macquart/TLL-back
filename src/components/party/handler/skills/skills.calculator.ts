import { Summoner } from '@app/components/summoner/DAL/models';
import { DynamicStatistics } from '@app/components/party/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';

export class SkillCalculator {
  /**
   *
   * @param correspSummoners
   */
  dmgTo(emittor: Summoner, receptor: Summoner, skill: Skill, dmgType?: string): void {
    // TESTING PART TO REMOVE AFTER JUDGING OK
    emittor.currPosition = 'A1';
    receptor.summon.stats.lifepoints = 5000;

    switch (dmgType) {
      // Applicate damage to receptor in terms of the current number of the case
      case 'case-number':
        receptor.summon.stats.lifepoints -=
          skill.coeff * emittor.summon.stats.att * parseInt(emittor.currPosition.split('')[1], 10) -
          receptor.summon.stats.def;
        break;
      // No special effect, regular damage
      default:
        receptor.summon.stats.lifepoints -=
          emittor.summon.stats.att * skill.coeff - receptor.summon.stats.def;
    }
  }

  /**
   *
   * @param correspSummoners
   * @param skill
   * @param dmgType
   */
  applicateSkillToAllReceptors(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    skill: Skill,
    dmgType?: string,
  ) {
    const { emittor } = correspSummoners;
    correspSummoners.receptors.forEach((receptor: Summoner) => {
      this.dmgTo(emittor, receptor, skill, dmgType);
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

  updateLegacyEnergy(emittor: Summoner, receptor: Summoner, skill: Skill) {
    receptor.legacyEnergy = 300;
    receptor.legacyEnergy -= receptor.legacyEnergy * (skill.addCost / 100);
  }
}
