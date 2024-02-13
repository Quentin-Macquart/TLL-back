import TYPES from '@app/shared/container/types';
import container from '@app/shared/container/container';
import { SummonerController } from '@app/components/summoner/controller/summoner.controller';

const summonerController: SummonerController = container.get<SummonerController>(TYPES.SummonerController);

export default [
  {
    path: '/summoners',
    method: 'get',
    handler: summonerController.findSummoners.bind(summonerController),
  },
  {
    path: '/summoner/:id',
    method: 'get',
    handler: summonerController.findSummonerById.bind(summonerController),
  },
];
