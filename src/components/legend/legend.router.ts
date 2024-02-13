import TYPES from '@app/shared/container/types';
import container from '@app/shared/container/container';
import { LegendController } from './controller/legend.controller';

const legendController: LegendController = container.get<LegendController>(TYPES.LegendController);

export default [
  {
    path: '/legends',
    method: 'get',
    handler: legendController.findLegends.bind(legendController),
  },
  {
    path: '/legends/:id',
    method: 'get',
    handler: legendController.findLegendById.bind(legendController),
  },
];
