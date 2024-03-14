import TYPES from '@app/shared/container/types';
import container from '@app/shared/container/container';
import { PartyController } from '@app/components/party/controller/party.controller';

const partyController: PartyController = container.get<PartyController>(TYPES.PartyController);

export default [
  {
    path: '/party',
    method: 'get',
    handler: partyController.findParty.bind(partyController),
  },
  {
    path: '/party',
    method: 'post',
    handler: partyController.createParty.bind(partyController),
  },
  {
    path: '/party',
    method: 'put',
    handler: partyController.updateParty.bind(partyController),
  },
  {
    path: '/party/stat-update',
    method: 'put',
    handler: partyController.updateStatistics.bind(partyController),
  },
];
