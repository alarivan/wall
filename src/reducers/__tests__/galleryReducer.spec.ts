import { Map } from 'immutable';
import { galleryReducer } from '../gallery/reducer';
import { saveAction, deleteAction } from '../gallery/actions';
import {
  TGalleryState,
  SAVE_ACTION,
  SAVE,
  DELETE_ACTION,
  DELETE,
} from '../gallery/types';
import { initGrid } from '../gridReducer';
import { TGridData } from '../../types';

const createGrid = (id: string, data: TGridData) =>
  initGrid({ id, columns: 2, rows: 2, size: 20, background: 'red' }, data);

const grid = createGrid('fake_id', { '24': '#fff' });

const initialState: TGalleryState = Map({
  fake_id: grid,
});

describe('galleryReducer', () => {
  it('returns initial state', () => {
    const state: TGalleryState = galleryReducer(initialState, {
      type: 'EMPTY',
    });

    expect(state).toEqual(state);
  });

  it('creates SAVE_ACTION', () => {
    const action: SAVE_ACTION = saveAction(grid);

    expect(action).toEqual({
      type: SAVE,
      payload: { grid },
    });
  });

  it('creates DELETE_ACTION', () => {
    const action: DELETE_ACTION = deleteAction(grid);

    expect(action).toEqual({
      type: DELETE,
      payload: { id: grid.meta.id },
    });
  });

  it('adds new item to state on SAVE_ACTION', () => {
    const action: SAVE_ACTION = saveAction(grid);
    const state: TGalleryState = galleryReducer(Map(), action);

    expect(state).toEqual(initialState);
  });

  it('updates state item on SAVE_ACTION when item exists', () => {
    const newGrid = createGrid('fake_id', { '22': 'green' });
    const action: SAVE_ACTION = saveAction(newGrid);
    const state: TGalleryState = galleryReducer(initialState, action);

    expect(state).toEqual(Map({ fake_id: newGrid }));
  });

  it('deletes state item on DELETE_ACTION', () => {
    const action: DELETE_ACTION = deleteAction(grid);
    const state: TGalleryState = galleryReducer(initialState, action);

    expect(state).toEqual(Map());
  });
});
