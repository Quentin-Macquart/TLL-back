export interface Square {
  name: string;
  visible: boolean;
  occupied: boolean;
  onFight: boolean;
  selectable: boolean;
}

export type Line = Square[];
export type Column = Square[];
export type Board = Square[][];
