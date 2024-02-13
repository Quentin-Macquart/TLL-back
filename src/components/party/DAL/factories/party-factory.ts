import { logger } from '@app/shared/utils/logger';
import { injectable } from 'inversify';
import { BoardConfig, PartyConfig } from '@app/components/party/DAL/models/party-config';
import { Board, Party, Line, Square, DynamicStatistics } from '@app/components/party/DAL/models/index';
import { Constants } from '@app/shared/utils/constants/constants';
import { Summoner } from '@app/components/summoner/DAL/models';
import { Skill } from '@app/components/legend/DAL/models';
import { SkillTypes } from '@app/shared/utils/enums/enums';

@injectable()
export class PartyFactory {
  /**  Create party object to send later to the client
   *
   * @param {PartyConfig} body received from the client
   * @returns {Promise<Party>} party completed
   */
  public async createParty(body: PartyConfig): Promise<Party> {
    logger.info('Creating party in progress');
    const board: Board = this.initializedBoard(body.boardConfig);
    return {
      nbPlayers: body.nbPlayers,
      partyBoard: board,
      partySummoners: body.summoners,
      turnNb: 0,
      turnToPlay: '',
    };
  }

  /**
   * Initializes a game board with the specified configurations.
   *
   * @param {BoardConfig} boardConfig - The board configuration settings.
   * @returns {Board} - The initialized game board.
   */
  initializedBoard(boardConfig: BoardConfig): Board {
    // Create an array of letters based on the specified number of lines in the configurations.
    const stringLinesArray: string[] = Constants.ALPHABET.slice(0, boardConfig.lines);

    // Map each letter to create the lines of the game board.
    return stringLinesArray.map((lineLetter: string) =>
      this.createLineIterations(lineLetter, boardConfig.columns),
    );
  }

  /**
   * Creates a line of squares for the game board based on the line letter and the specified number of columns.
   *
   * @param {string} lineLetter - The line letter.
   * @param {number} columnsNumb - The number of columns.
   * @returns {Line} - The created line of squares.
   */
  createLineIterations(lineLetter: string, columnsNumb: number): Line {
    // Initialize an empty line.
    const completeLine: Line = [];

    // Iterate through each column to create a square with the specified properties.
    for (let i = 0; i < columnsNumb; i++) {
      const square: Square = {
        name: `${lineLetter + (i + 1)}`,
        visible: false,
        occupied: false,
        onFight: false,
        selectable: true,
      };

      // Add the square to the line.
      completeLine.push(square);
    }
    return completeLine;
  }

  /**
   * Manages statistics for a party based on dynamic statistics.
   * @param {Party} party The party for which statistics are managed.
   * @param {DynamicStatistics} body The dynamic statistics containing relevant data.
   * @returns {Summoner[]} An array of updated summoners.
   */
  manageStatistics(party: Party, body: DynamicStatistics): Summoner[] {
    const updatedSummoners: Summoner[] = [];
    const correspSummoners: { emittor: Summoner; receptors: Summoner[] } = this.getCorrSummoners(party, body);

    if (body.benefits || body.injuries) {
      this.manageSkills(correspSummoners, body);
    }
    return updatedSummoners;
  }

  /**
   * Retrieves the corresponding emittor and receptor summoners based on a party and dynamic statistics.
   * @param {Party} party The party to search within.
   * @param {DynamicStatistics} body The dynamic statistics containing relevant data.
   * @returns An object containing the emittor summoner and an array of receptor summoners.
   */
  getCorrSummoners(party: Party, body: DynamicStatistics): { emittor: Summoner; receptors: Summoner[] } {
    const emittor: Summoner = party.partySummoners.filter((summoner: Summoner) => {
      return summoner.id === body.from;
    })[0];

    const receptors: Summoner[] = party.partySummoners.filter((summoner: Summoner) => {
      return body.to.includes(summoner.id);
    });
    return { emittor, receptors };
  }

  /**
   * Calculates statistics based on the provided emittor and receptors and dynamic statistics.
   * @param correspSummoners An object containing the emittor summoner and an array of receptor summoners.
   * @param body The dynamic statistics containing relevant data.
   */
  manageSkills(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, body: DynamicStatistics) {
    let skillUsed: Skill;
    if (body.isLegendSkill) {
      [skillUsed] = correspSummoners.emittor.summon.skills.filter((skill: Skill) => {
        return skill.number === body.skillNumb;
      });

      // LOGGER
      logger.info(
        `La légende ${correspSummoners.emittor.summon.name} utilise sa compétence ${skillUsed.number} : ${skillUsed.name}`,
      );
    } else {
      [skillUsed] = correspSummoners.emittor.skills.filter((skill: Skill) => {
        return skill.number === body.skillNumb;
      });

      // LOGGER
      logger.info(
        `La legacy ${correspSummoners.emittor.name} utilise sa compétence ${skillUsed.number} : ${skillUsed.name}`,
      );
    }
    switch (skillUsed.type) {
      case SkillTypes.DEFENSIVE:
        logger.info('DEFENSIVE SKILL ACTIVATED');
        break;
      case SkillTypes.OFFENSIVE:
        logger.info('OFFENSIVE SKILL ACTIVATED');
        break;
      case SkillTypes.STRATEGIC:
        logger.info('STRATEGIC SKILL ACTIVATED');
        break;
      default:
        logger.info('NO SKILL ACTIVATED');
        break;
    }
  }
}
