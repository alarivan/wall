import {
  TState,
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
  UPDATE_SIZE_ACTION,
  UPDATE_SIZE,
  UNDO,
  UNDO_ACTION,
  REDO,
  REDO_ACTION,
} from '../types';

export const initialState: TState = {
  history: [
    _emptyGrid({ meta: { rows: 20, columns: 20, size: 20 }, data: [] }),
  ],
  current: 0,
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
export function updateSizeAction(value: number): UPDATE_SIZE_ACTION {
  return {
    type: UPDATE_SIZE,
    payload: { value },
  };
}
export function undoAction(): UNDO_ACTION {
  return {
    type: UNDO,
  };
}
export function redoAction(): REDO_ACTION {
  return {
    type: REDO,
  };
}

export const gridReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case PAINT:
      return _updateGrid(state, _paintCell(action));

    case CLEAR:
      return _updateGrid(state, _emptyGrid);

    case UPDATE_ROWS: {
      return _updateGrid(state, _updateRows(action));
    }

    case UPDATE_COLUMNS: {
      return _updateGrid(state, _updateColumns(action));
    }

    case UPDATE_SIZE:
      return _updateGrid(state, _updateSize(action));

    case UNDO:
      if (state.current > 0) {
        return Object.assign({}, state, { current: state.current - 1 });
      }
      return state;

    case REDO:
      if (state.current < state.history.length - 1) {
        return Object.assign({}, state, { current: state.current + 1 });
      }
      return state;

    default:
      return state;
  }
};

function _updateGrid(state: TState, fn: (grid: TGrid) => TGrid): TState {
  const currentHistory = state.history.slice(0, state.current + 1);
  const current = currentHistory[state.current];
  const grid = fn(current);

  return _addToHistory(currentHistory, grid, state);
}

function _addToHistory(history: TGrid[], next: TGrid, state: TState): TState {
  return Object.assign({}, state, {
    history: [...history, next],
    current: state.current + 1,
  });
}

function _emptyGrid(grid: TGrid): TGrid {
  return Object.assign({}, grid, {
    data: _emptyArray(grid.meta.rows * grid.meta.columns),
  });
}

function _paintCell(action: PAINT_ACTION): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    const arr: TColor[] = [];
    const data = arr.concat(
      grid.data.slice(0, action.payload.index),
      [action.payload.color],
      grid.data.slice(action.payload.index + 1),
    );

    return Object.assign({}, grid, { data });
  };
}

function _updateSize(action: UPDATE_SIZE_ACTION): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    return Object.assign({}, grid, {
      meta: { ...grid.meta, size: action.payload.value },
    });
  };
}

function _updateRows(action: UPDATE_ROWS_ACTION): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    const newSize = action.payload.value * grid.meta.columns;
    const oldSize = grid.meta.columns * grid.meta.rows;
    const difference = newSize - oldSize;
    const stateCopy = [...grid.data];

    let data;
    if (difference > 0) {
      data = stateCopy.concat(_emptyArray(difference));
    } else {
      data = stateCopy.splice(0, stateCopy.length - Math.abs(difference));
    }

    return Object.assign({}, grid, {
      data,
      meta: { ...grid.meta, rows: action.payload.value },
    });
  };
}

function _updateColumns(action: UPDATE_COLUMNS_ACTION): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    const newSize = action.payload.value * grid.meta.rows;
    const oldSize = grid.meta.columns * grid.meta.rows;
    const difference = newSize - oldSize;

    let data = [...grid.data];
    if (difference > 0) {
      for (
        let i = action.payload.value - 1;
        i < newSize;
        i += action.payload.value
      ) {
        data.splice(
          i,
          0,
          ..._emptyArray(action.payload.value - grid.meta.columns),
        );
      }
    } else {
      for (
        let i = action.payload.value;
        i < newSize + 1;
        i += action.payload.value
      ) {
        data.splice(i, grid.meta.columns - action.payload.value);
      }
    }

    return Object.assign({}, grid, {
      data,
      meta: { ...grid.meta, columns: action.payload.value },
    });
  };
}

function _emptyArray(size: number): null[] {
  return Array(size).fill(null);
}
