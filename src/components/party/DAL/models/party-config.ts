import { Summoner } from '@app/components/summoner/DAL/models';

export interface BoardConfig {
  lines: number;
  columns: number;
}

export interface PartyConfig {
  nbPlayers: number;
  boardConfig: BoardConfig;
  summoners: Summoner[];
}
