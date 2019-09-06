import {
  TGrid,
  TColor,
  TAction,
  PAINT,
  PAINT_ACTION,
  CLEAR,
  CLEAR_ACTION,
} from '../types';

export const initialState: TGrid = {
  meta: {
    rows: 20,
    columns: 20,
    width: 20,
  },
  data: emptyGrid(20, 20),
};

export function paintAction(index: number, color: TColor): PAINT_ACTION {
  return {
    type: PAINT,
    payload: { index, color },
  };
}
export function clearAction(): CLEAR_ACTION {
  return {
    type: CLEAR,
  };
}

export function emptyGrid(rows: number, columns: number): TColor[] {
  return new Array(rows * columns).fill(null);
}

export const gridReducer = (state: TGrid, action: TAction): TGrid => {
  switch (action.type) {
    case PAINT:
      const arr: TColor[] = [];
      const data = arr.concat(
        state.data.slice(0, action.payload.index),
        [action.payload.color],
        state.data.slice(action.payload.index + 1),
      );
      return Object.assign({}, state, { data });
    case CLEAR:
      return Object.assign({}, state, {
        data: emptyGrid(state.meta.rows, state.meta.columns),
      });
    default:
      return state;
  }
};
