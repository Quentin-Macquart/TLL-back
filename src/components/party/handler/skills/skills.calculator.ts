import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { Constants } from '@app/shared/utils/constants/constants';
import { Board } from '@app/components/party/DAL/models';

export class SkillCalculator {
  /**
   * Applies damage to the receptor based on the specified damage type and skill.
   * @param {Summoner} emittor - The summoner executing the skill.
   * @param {Summoner} receptor - The summoner receiving the damage.
   * @param {Skill} skill - The skill being used to calculate damage.
   * @param {string} [dmgType] - The type of damage to apply, affecting the calculation.
   */
  dmgTo(emittor: Summoner, receptor: Summoner, skill: Skill, dmgType?: string): void {
    // TESTING PART TO REMOVE AFTER JUDGING OK
    emittor.currPosition = 'A1';
    receptor.summon.stats.lifepoints = 5000;

    // TO KEEP
    const isStealthActive = emittor.summon.status.some(status => status.status === 'stealth');

    switch (dmgType) {
      // Applicate damage to receptor in terms of the current number of the case
      case 'case-number':
        receptor.summon.stats.lifepoints -=
          skill.coeff * emittor.summon.stats.att * parseInt(emittor.currPosition.split('')[1], 10) -
          receptor.summon.stats.def;
        break;
      case 'def-penetrate':
        receptor.summon.stats.lifepoints -= skill.coeff * emittor.summon.stats.att;
        break;
      case 'legacy-energy':
        receptor.summon.stats.lifepoints -= skill.coeff * emittor.legacyEnergy - receptor.summon.stats.def;
        break;
      case 'even':
        if (parseInt(emittor.currPosition.split('')[1], 10) % 2 === 0) {
          receptor.summon.stats.lifepoints -=
            emittor.summon.stats.att * skill.coeff * 1.2 - receptor.summon.stats.def;
        } else {
          receptor.summon.stats.lifepoints -=
            emittor.summon.stats.att * skill.coeff - receptor.summon.stats.def;
        }
        break;
      case 'stealth':
        if (isStealthActive) {
          receptor.summon.stats.lifepoints -=
            emittor.summon.stats.att * skill.coeff * 2 - receptor.summon.stats.def;
        } else {
          receptor.summon.stats.lifepoints -=
            emittor.summon.stats.att * skill.coeff - receptor.summon.stats.def;
        }
        break;
      default:
        receptor.summon.stats.lifepoints -=
          emittor.summon.stats.att * skill.coeff - receptor.summon.stats.def;
    }
  }

  /**
   * Applies a skill effect to all receptors in the provided group.
   * @param {{ emittor: Summoner; receptors: Summoner[] }} correspSummoners - The emittor and array of receptors.
   * @param {Skill} skill - The skill being applied.
   * @param {string} [dmgType] - The type of damage or effect to apply.
   */
  applicateSkillToAllReceptors(
    correspSummoners: { emittor: Summoner; receptors: Summoner[] },
    skill: Skill,
    dmgType?: string,
  ): void {
    const { emittor } = correspSummoners;
    correspSummoners.receptors.forEach((receptor: Summoner) => {
      this.dmgTo(emittor, receptor, skill, dmgType);
    });
  }

  /**
   * Recovers life points for the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner whose life points will be recovered.
   * @param {Skill} skillUsed - The skill that triggers the life points recovery.
   */
  recoverLP(emittor: Summoner, skillUsed: Skill): void {
    emittor.summon.stats.lifepoints += skillUsed.addCost;
  }

  /**
   * Updates the defense of the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner whose defense will be updated.
   * @param {Skill} skillUsed - The skill that triggers the defense update.
   */
  updateDefense(emittor: Summoner, skillUsed: Skill): void {
    emittor.summon.stats.def += skillUsed.addCost;
  }

  /**
   * Updates the attack power of the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner whose attack power will be updated.
   * @param {Skill} skillUsed - The skill that triggers the attack power update.
   */
  updateAttack(emittor: Summoner, skillUsed: Skill): void {
    emittor.summon.stats.att += skillUsed.addCost;
  }

  /**
   * Updates the speed of the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner whose speed will be updated.
   * @param {Skill} skillUsed - The skill that triggers the speed update.
   */
  updateSpeed(emittor: Summoner, skillUsed: Skill): void {
    emittor.summon.stats.speed += skillUsed.coeff * emittor.summon.stats.speed;
  }

  /**
   * Updates the critical rate of the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner whose critical rate will be updated.
   * @param {Skill} skillUsed - The skill that triggers the critical rate update.
   */
  updateCriticalRate(emittor: Summoner, skillUsed: Skill): void {
    emittor.summon.stats.critPercent += skillUsed.addCost;
  }

  /**
   * Inflicts a status effect on the receptor based on the skill used.
   * @param {Summoner} receptor - The summoner receiving the status effect.
   * @param {Skill} skill - The skill that triggers the status effect.
   */
  inflictStatus(receptor: Summoner, skill: Skill): void {
    receptor.summon.status.push({ status: skill.givingStatus.name, turnsLeft: skill.givingStatus.nbTurn });
  }

  /**
   * Adds action points to the emittor.
   * @param {Summoner} emittor - The summoner receiving additional action points.
   * @param {number} number - The number of action points to add.
   */
  obtainAA(emittor: Summoner, number: number): void {
    emittor.currAA += number;
  }

  /**
   * Grants a status effect to the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner receiving the status effect.
   * @param {Skill} skill - The skill that grants the status effect.
   */
  grantStatus(emittor: Summoner, skill: Skill): void {
    emittor.summon.status.push({
      status: skill.recievingStatus.name,
      turnsLeft: skill.recievingStatus.nbTurn,
    });
  }

  /**
   * Reduces the legacy energy of the receptor based on the skill used.
   * @param {Summoner} receptor - The summoner whose legacy energy will be reduced.
   * @param {Skill} skill - The skill that triggers the legacy energy reduction.
   */
  reduceLegacyEnergy(receptor: Summoner, skill: Skill): void {
    receptor.legacyEnergy = 300;
    receptor.legacyEnergy -= receptor.legacyEnergy * skill.addCost;
  }

  /**
   * Adds legacy energy to the emittor based on the skill used.
   * @param {Summoner} emittor - The summoner receiving the legacy energy.
   * @param {Skill} skill - The skill that triggers the addition of legacy energy.
   */
  addLegacyEnergy(emittor: Summoner, skill: Skill): void {
    emittor.legacyEnergy += skill.addCost;
  }

  /**
   * Reveal one case on the board
   * @param {Board} board
   * @param {string} caseName
   */
  revealOneCase(board: Board, caseName: string) {
    if (board) {
      const caseLetter: string = caseName.split('')[0];
      const caseNumber: number = parseInt(caseName.split('')[1], 10);

      const possibleLines: string[] = Constants.ALPHABET;
      const currentIndex = possibleLines.findIndex((letter: string) => letter === caseLetter);
      board[currentIndex][caseNumber - 1].visible = true;
    }
  }
}
