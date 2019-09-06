import { TGrid, TColor, TAction, PAINT, PAINT_ACTION } from '../types';

export const initialState: TGrid = {
  meta: {
    rows: 20,
    columns: 20,
    width: 20,
  },
  data: new Array(400).fill(null),
};

export function paintAction(index: number, color: TColor): PAINT_ACTION {
  return {
    type: PAINT,
    payload: { index, color },
  };
}

export const gridReducer = (state: TGrid, action: TAction): TGrid => {
  switch (action.type) {
    case 'PAINT':
      const arr: TColor[] = [];
      const data = arr.concat(
        state.data.slice(0, action.payload.index),
        [action.payload.color],
        state.data.slice(action.payload.index + 1),
      );
      return Object.assign({}, state, { data });

    default:
      return state;
  }
};
