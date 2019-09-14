import uuidv4 from 'uuidv4';
import {
  TState,
  TGrid,
  TColor,
  TAction,
  PAINT,
  PAINT_ACTION,
  UPDATE_BACKGROUND,
  UPDATE_BACKGROUND_ACTION,
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
  RESET,
  RESET_ACTION,
  TGridMeta,
  TGridData,
  TGridMetaInit,
} from '../types';
import { DEFAULT_BACKGROUND } from '../constants';

export const initialState: TState = initState(
  initGrid(
    { rows: 20, columns: 20, size: 20, background: DEFAULT_BACKGROUND },
    {},
  ),
);

export function paintAction(index: number, color: TColor): PAINT_ACTION {
  return {
    type: PAINT,
    payload: { index, color },
  };
}
export function updateBackgroundAction(
  color: TColor,
): UPDATE_BACKGROUND_ACTION {
  return {
    type: UPDATE_BACKGROUND,
    payload: { color },
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
export function resetAction(): RESET_ACTION {
  return {
    type: RESET,
  };
}

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

export function initMeta(meta: TGridMeta | TGridMetaInit): TGridMeta {
  return {
    id: meta.id || uuidv4(),
    columns: meta.columns,
    rows: meta.rows,
    size: meta.size,
    length: meta.columns * meta.rows,
    background: meta.background,
  };
}

export function initGrid(
  meta: TGridMeta | TGridMetaInit,
  data: TGridData = {},
): TGrid {
  return {
    meta: initMeta(meta),
    data,
    [Symbol.iterator]() {
      const length = this.meta.length;
      const data = this.data;
      let index = 0;

      return {
        next(): IteratorResult<TColor> {
          if (index >= length) {
            return {
              value: undefined,
              done: true,
            };
          }

          return {
            value: data[index++],
            done: false,
          };
        },
      };
    },
  };
}

export function initState(grid: TGrid): TState {
  return {
    history: [grid],
    current: 0,
  };
}
