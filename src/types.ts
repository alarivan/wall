export type TColor = string | undefined;

export type TGridData = {
  [index: string]: TColor;
};

export type TGridMeta = {
  rows: number;
  columns: number;
  size: number;
  length: number;
};

export interface TGrid extends Iterable<TColor> {
  meta: TGridMeta;
  data: TGridData;
  [Symbol.iterator]: () => Iterator<TColor>;
}

export type TState = {
  history: TGrid[];
  current: number;
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

export const UPDATE_ROWS = 'UPDATE_ROWS';
export type UPDATE_ROWS_ACTION = {
  type: typeof UPDATE_ROWS;
  payload: {
    value: number;
  };
};

export const UPDATE_COLUMNS = 'UPDATE_COLUMNS';
export type UPDATE_COLUMNS_ACTION = {
  type: typeof UPDATE_COLUMNS;
  payload: {
    value: number;
  };
};

export const UPDATE_SIZE = 'UPDATE_SIZE';
export type UPDATE_SIZE_ACTION = {
  type: typeof UPDATE_SIZE;
  payload: {
    value: number;
  };
};

export const UNDO = 'UNDO';
export type UNDO_ACTION = {
  type: typeof UNDO;
};

export const REDO = 'REDO';
export type REDO_ACTION = {
  type: typeof REDO;
};

export const RESET = 'RESET';
export type RESET_ACTION = {
  type: typeof RESET;
};

export type TAction =
  | PAINT_ACTION
  | CLEAR_ACTION
  | UPDATE_ROWS_ACTION
  | UPDATE_COLUMNS_ACTION
  | UPDATE_SIZE_ACTION
  | UNDO_ACTION
  | REDO_ACTION
  | RESET_ACTION
  | { type: 'EMPTY' };
