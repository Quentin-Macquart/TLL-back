import { LegendSkills, Arthur } from '@app/components/party/handler';

export class LegendFactory {
  static createLegend(id: number): LegendSkills {
    switch (id) {
      case 1:
        return new Arthur();
      default:
        throw new Error('No Legend Found');
    }
  }
}
