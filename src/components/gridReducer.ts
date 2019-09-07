import {
  TGrid,
  TColor,
  TAction,
  PAINT,
  PAINT_ACTION,
  CLEAR,
  CLEAR_ACTION,
  UPDATE_ROWS,
  UPDATE_ROWS_ACTION,
  UPDATE_COLUMNS,
  UPDATE_COLUMNS_ACTION,
  UPDATE_WIDTH_ACTION,
  UPDATE_WIDTH,
} from '../types';

export const initialState: TGrid = {
  meta: {
    rows: 20,
    columns: 20,
    width: 20,
  },
  data: _emptyGrid(20, 20),
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
export function updateRowsAction(value: number): UPDATE_ROWS_ACTION {
  return {
    type: UPDATE_ROWS,
    payload: { value },
  };
}
export function updateColumnsAction(value: number): UPDATE_COLUMNS_ACTION {
  return {
    type: UPDATE_COLUMNS,
    payload: { value },
  };
}
export function updateWidthAction(value: number): UPDATE_WIDTH_ACTION {
  return {
    type: UPDATE_WIDTH,
    payload: { value },
  };
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
        data: _emptyGrid(state.meta.rows, state.meta.columns),
      });
    case UPDATE_ROWS:
      return _updateRows(state, action.payload.value);
    case UPDATE_COLUMNS:
      return _updateColumns(state, action.payload.value);
    case UPDATE_WIDTH:
      return Object.assign({}, state, {
        meta: { ...state.meta, width: action.payload.value },
      });
    default:
      return state;
  }
};

function _emptyGrid(rows: number, columns: number): TColor[] {
  return _emptyArray(rows * columns);
}

function _emptyArray(size: number): null[] {
  return new Array(size).fill(null);
}

function _updateRows(state: TGrid, rows: number): TGrid {
  const newSize = rows * state.meta.columns;
  const oldSize = state.meta.columns * state.meta.rows;
  const difference = newSize - oldSize;
  const stateCopy = [...state.data];

  let data;
  if (difference > 0) {
    data = stateCopy.concat(_emptyArray(difference));
  } else {
    data = stateCopy.splice(0, stateCopy.length - Math.abs(difference));
  }

  return Object.assign({}, state, {
    data,
    meta: { ...state.meta, rows },
  });
}

function _updateColumns(state: TGrid, columns: number): TGrid {
  const newSize = columns * state.meta.rows;
  const oldSize = state.meta.columns * state.meta.rows;
  const difference = newSize - oldSize;

  let data = [...state.data];
  if (difference > 0) {
    for (let i = columns - 1; i < newSize; i += columns) {
      data.splice(i, 0, ..._emptyArray(columns - state.meta.columns));
    }
  } else {
    for (let i = columns; i < newSize + 1; i += columns) {
      data.splice(i, state.meta.columns - columns);
    }
  }

  return Object.assign({}, state, {
    data,
    meta: { ...state.meta, columns },
  });
}
