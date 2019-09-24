import { TGalleryAction, TGalleryState, SAVE, DELETE } from './types';
import { initGrid } from '../editor/utils';
import { Map } from 'immutable';
import { DEFAULT_GALLERY_ITEM } from '../../constants';

export const initialGalleryState: TGalleryState = Map({
  [DEFAULT_GALLERY_ITEM.meta.id]: initGrid(
    DEFAULT_GALLERY_ITEM.meta,
    DEFAULT_GALLERY_ITEM.data,
  ),
});

export const galleryReducer = (
  state: TGalleryState,
  action: TGalleryAction,
) => {
  switch (action.type) {
    case SAVE:
      return state.set(action.payload.grid.meta.id, action.payload.grid);

    case DELETE:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};
