export type TColor = string | null;

export type TGrid = {
  meta: {
    rows: number;
    columns: number;
    width: number;
  };
  data: TColor[];
};

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

export const UPDATE_WIDTH = 'UPDATE_WIDTH';
export type UPDATE_WIDTH_ACTION = {
  type: typeof UPDATE_WIDTH;
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

export type TAction =
  | PAINT_ACTION
  | CLEAR_ACTION
  | UPDATE_ROWS_ACTION
  | UPDATE_COLUMNS_ACTION
  | UPDATE_WIDTH_ACTION
  | UNDO_ACTION
  | REDO_ACTION
  | { type: 'EMPTY' };
