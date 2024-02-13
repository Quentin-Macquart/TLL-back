export interface Stats {
  currentJR: number;
  JRperTurn: number;
  JRrecieve: number;
  pv: number;
  att: number;
  def: number;
  ardeur: number;
  vit: number;
  critPercent: number;
  degCrit: number;
}

export interface StatusConfig {
  name: string;
  nbTurn: number;
}
