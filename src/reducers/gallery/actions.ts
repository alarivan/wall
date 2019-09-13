import { TGrid } from '../../types';
import { SAVE_ACTION, SAVE, DELETE_ACTION, DELETE } from './types';

export function saveAction(grid: TGrid): SAVE_ACTION {
  return {
    type: SAVE,
    payload: { grid },
  };
}

export function deleteAction(grid: TGrid): DELETE_ACTION {
  return {
    type: DELETE,
    payload: { id: grid.meta.id },
  };
}
