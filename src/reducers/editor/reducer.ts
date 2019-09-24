import {
  TState,
  TAction,
  PAINT,
  UPDATE_BACKGROUND,
  CLEAR,
  UPDATE_ROWS,
  UPDATE_COLUMNS,
  UPDATE_SIZE,
  UNDO,
  REDO,
  RESET,
  SET_STATE,
  PAINT_ACTION,
  UPDATE_BACKGROUND_ACTION,
  UPDATE_SIZE_ACTION,
  UPDATE_ROWS_ACTION,
  UPDATE_COLUMNS_ACTION,
} from './types';
import { initState, initGrid, initMeta } from './utils';
import { DEFAULT_BACKGROUND } from '../../constants';
import { TGrid, TGridData } from '../../types';

export const initialState: TState = initState(
  initGrid(
    { rows: 20, columns: 20, size: 20, background: DEFAULT_BACKGROUND },
    {},
  ),
);

export const gridReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case PAINT:
      return _updateGrid(state, _paintCell(action));

    case UPDATE_BACKGROUND:
      return _updateGrid(state, _updateBackground(action));

    case CLEAR:
      return _updateGrid(state, _clearGrid);

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

    case RESET:
      return initialState;

    case SET_STATE:
      return action.payload.value;

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

function _clearGrid(grid: TGrid): TGrid {
  return initGrid(grid.meta);
}

function _paintCell(action: PAINT_ACTION): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    const index = action.payload.index;
    return Object.assign({}, grid, {
      data: { ...grid.data, [index]: action.payload.color },
    });
  };
}

function _updateBackground(
  action: UPDATE_BACKGROUND_ACTION,
): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    return Object.assign({}, grid, {
      meta: {
        ...grid.meta,
        background: action.payload.color,
      },
    });
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
    const difference: number = action.payload.value - grid.meta.rows;

    let data: TGridData = {};
    for (let [key, value] of Object.entries(grid.data)) {
      const intKey: number = parseInt(key);
      const lastLineFirstIndex =
        grid.meta.length - grid.meta.columns * Math.abs(difference);

      if (difference > 0 || intKey < lastLineFirstIndex) {
        data[key] = value;
      }
    }

    return Object.assign({}, grid, {
      data,
      meta: initMeta({
        ...grid.meta,
        rows: action.payload.value,
      }),
    });
  };
}

function _updateColumns(action: UPDATE_COLUMNS_ACTION): (grid: TGrid) => TGrid {
  return function(grid: TGrid): TGrid {
    const difference: number = action.payload.value - grid.meta.columns;

    let data: TGridData = {};
    for (let [key, value] of Object.entries(grid.data)) {
      const intKey: number = parseInt(key);
      const line = _getLine(grid.meta.columns, intKey);
      const edge = _getEdge(difference, grid.meta.columns, line);
      if (difference > 0 || !(intKey >= edge)) {
        const index: string = (intKey + difference * line).toString();
        data[index] = value;
      }
    }

    return Object.assign({}, grid, {
      data,
      meta: initMeta({
        ...grid.meta,
        columns: action.payload.value,
      }),
    });
  };
}

function _getLine(columns: number, index: number): number {
  const line = Math.floor(index / columns) - 1;
  return line + 1;
}

function _getEdge(difference: number, columns: number, line: number): number {
  return line * columns + (columns - Math.abs(difference));
}
