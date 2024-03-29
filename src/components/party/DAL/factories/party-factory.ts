import { logger } from '@app/shared/utils/logger';
import { injectable } from 'inversify';
import { PartyConfig } from '@app/components/party/DAL/models/party-config';
import { Board, Party, DynamicStatistics } from '@app/components/party/DAL/models/index';
import { Summoner } from '@app/components/summoner/DAL/models';
import { SkillsHandler, BoardHandler } from '@app/components/party/handler';

@injectable()
export class PartyFactory {
  private readonly boardHandler: BoardHandler;

  public readonly skillsHandler: SkillsHandler;

  constructor() {
    this.boardHandler = new BoardHandler();
    this.skillsHandler = new SkillsHandler();
  }

  /**  Create party object to send later to the client
   *
   * @param {PartyConfig} body received from the client
   * @returns {Promise<Party>} party completed
   */
  public async createParty(body: PartyConfig): Promise<Party> {
    logger.info('Creating party in progress');
    const board: Board = this.boardHandler.initializedBoard(body.boardConfig);
    return {
      nbPlayers: body.nbPlayers,
      partyBoard: board,
      partySummoners: body.summoners,
      turnNb: 0,
      turnToPlay: '',
    };
  }

  /**
   * Manages statistics for a party based on dynamic statistics.
   * @param {Party} party The party for which statistics are managed.
   * @param {DynamicStatistics} body The dynamic statistics containing relevant data.
   * @returns {Party} The party with updated summoner statistics.
   */
  manageStatistics(party: Party, body: DynamicStatistics): void {
    this.skillsHandler.manage(body, party);
  }
}
