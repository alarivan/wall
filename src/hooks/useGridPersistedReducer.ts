import { usePersistedReducer } from './usePersistedReducer';
import { TState, TAction, TGrid } from '../types';
import { initGrid } from '../reducers/gridReducer';
import { LOCAL_STORAGE_KEY_EDITOR } from '../constants';

type PersistedReducer = (
  reducer: React.Reducer<TState, TAction>,
  initialState: TState,
) => [TState, React.Dispatch<TAction>];

export const useGridPersistedReducer: PersistedReducer = (
  reducer,
  initialState,
) => {
  return usePersistedReducer<TState, TAction>(
    reducer,
    initialState,
    LOCAL_STORAGE_KEY_EDITOR,
    state => {
      const history = state.history.map((i: TGrid) => initGrid(i.meta, i.data));
      return Object.assign({}, state, { history });
    },
  );
};
