import { TColor } from '../../types';
import {
  PAINT_ACTION,
  PAINT,
  UPDATE_BACKGROUND_ACTION,
  UPDATE_BACKGROUND,
  CLEAR_ACTION,
  CLEAR,
  UPDATE_ROWS_ACTION,
  UPDATE_ROWS,
  UPDATE_COLUMNS_ACTION,
  UPDATE_COLUMNS,
  UPDATE_SIZE_ACTION,
  UPDATE_SIZE,
  UNDO_ACTION,
  UNDO,
  REDO_ACTION,
  REDO,
  RESET_ACTION,
  RESET,
  TState,
  SET_STATE_ACTION,
  SET_STATE,
} from './types';

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

export function setStateAction(value: TState): SET_STATE_ACTION {
  return {
    type: SET_STATE,
    payload: {
      value,
    },
  };
}
