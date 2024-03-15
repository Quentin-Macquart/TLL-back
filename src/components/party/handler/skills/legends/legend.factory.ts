import {
  LegendSkills,
  Arthur,
  Dartagnan,
  Miyamoto,
  Apollon,
  Cupidon,
  Robin,
  Dracula,
  Medusa,
  Minotaure,
  Morgane,
  Lucifer,
  Salem,
  Nature,
  Davinci,
  Merlin,
  Corday,
  Cleopatre,
  Jack,
  Drake,
  Hercule,
  Odin,
} from '@app/components/party/handler';

export class LegendFactory {
  static createLegend(id: number): LegendSkills {
    switch (id) {
      case 1:
        return new Arthur();
      case 2:
        return new Dartagnan();
      case 3:
        return new Miyamoto();
      case 4:
        return new Apollon();
      case 5:
        return new Cupidon();
      case 6:
        return new Robin();
      case 7:
        return new Dracula();
      case 8:
        return new Medusa();
      case 9:
        return new Minotaure();
      case 10:
        return new Morgane();
      case 11:
        return new Lucifer();
      case 12:
        return new Salem();
      case 13:
        return new Nature();
      case 14:
        return new Davinci();
      case 15:
        return new Merlin();
      case 16:
        return new Corday();
      case 17:
        return new Cleopatre();
      case 18:
        return new Jack();
      case 19:
        return new Drake();
      case 20:
        return new Hercule();
      case 21:
        return new Odin();
      default:
        throw new Error('No Legend Found');
    }
  }
}
