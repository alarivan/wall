export type TColor = string | null;

export type TGrid = {
  meta: {
    rows: number;
    columns: number;
    width: number;
  };
  data: TColor[];
};

export const PAINT = 'PAINT';
export type PAINT_ACTION = {
  type: typeof PAINT;
  payload: {
    index: number;
    color: TColor;
  };
};

export const CLEAR = 'CLEAR';
export type CLEAR_ACTION = {
  type: typeof CLEAR;
};

export type TAction = PAINT_ACTION | CLEAR_ACTION | { type: 'EMPTY' };
