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

export type TAction = PAINT_ACTION | { type: 'EMPTY' };
