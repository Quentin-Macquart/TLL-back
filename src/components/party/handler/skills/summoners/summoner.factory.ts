import {
  SummonerSkills,
  Beirn,
  Blackthorn,
  Furiaar,
  Gemonia,
  Givresang,
  Takashi,
  Valhjart,
} from '@app/components/party/handler';

export class SummonerFactory {
  static createSummoner(id: number): SummonerSkills {
    switch (id) {
      case 1:
        return new Beirn();
      case 2:
        return new Blackthorn();
      case 3:
        return new Furiaar();
      case 4:
        return new Gemonia();
      case 5:
        return new Givresang();
      case 6:
        return new Takashi();
      case 7:
        return new Valhjart();
      default:
        throw new Error('No Summoner Found');
    }
  }
}
