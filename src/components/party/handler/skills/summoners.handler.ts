import { SkillsHandler } from '@app/components/party/handler';
import { Summoner } from '@app/components/summoner/DAL/models';
import { DynamicStatistics } from '@app/components/party/DAL/models';

export class SummonerSkillsHandler {
  private skillsHandler: SkillsHandler;

  constructor(skillsHandler: SkillsHandler) {
    this.skillsHandler = skillsHandler;
  }

  // /**
  //  *
  //  * @param correspSummoners
  //  * @param body
  //  */
  // activate(correspSummoners: { emittor: Summoner; receptors: Summoner[] }, body: DynamicStatistics) {
  //   this.skillsHandler.activate(correspSummoners, body);
  // }
}
