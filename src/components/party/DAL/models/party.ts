import { Board } from '@app/components/party/DAL/models/board';
import { Summoner } from '@app/components/summoner/DAL/models';

export interface Party {
  nbPlayers: number;
  partyBoard: Board;
  partySummoners: Summoner[];
  turnNb: number;
  turnToPlay: string;
}
