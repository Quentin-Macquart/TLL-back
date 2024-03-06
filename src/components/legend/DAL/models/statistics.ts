export interface Stats {
  currentJR: number;
  JRperTurn: number;
  JRrecieve: number;
  lifepoints: number;
  att: number;
  def: number;
  readiness: number;
  speed: number;
  critPercent: number;
  critDmg: number;
}

export interface StatusConfig {
  name: string;
  nbTurn: number;
}
