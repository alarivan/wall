import { Map } from 'immutable';
import { usePersistedReducer } from './usePersistedReducer';
import { initGrid } from '../reducers/gridReducer';
import { LOCAL_STORAGE_KEY_GALLERY } from '../constants';
import { TGalleryState, TGalleryAction } from '../reducers/gallery/types';

type PersistedReducer = (
  reducer: React.Reducer<TGalleryState, TGalleryAction>,
  initialState: TGalleryState,
) => [TGalleryState, React.Dispatch<TGalleryAction>];

export const useGalleryPersistedReducer: PersistedReducer = (
  reducer,
  initialState,
) => {
  return usePersistedReducer<TGalleryState, TGalleryAction>(
    reducer,
    initialState,
    LOCAL_STORAGE_KEY_GALLERY,
    state => {
      return Map(state).map(value => initGrid(value.meta, value.data));
    },
  );
};
