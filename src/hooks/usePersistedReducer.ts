import { useReducer, useEffect } from 'react';
import { TState, TAction, TGrid } from '../types';
import { LOCAL_STORAGE_KEY_EDITOR } from '../constants';
import { initGrid } from '../reducers/gridReducer';

type PersistedReducer = (
  reducer: React.Reducer<TState, TAction>,
  initialState: TState,
) => [TState, React.Dispatch<TAction>];

export const usePersistedReducer: PersistedReducer = (
  reducer,
  initialState,
) => {
  const init = (defaultState: TState): TState => {
    const persisted: string | null = localStorage.getItem(
      LOCAL_STORAGE_KEY_EDITOR,
    );
    if (persisted) {
      const state = JSON.parse(persisted);
      const history = state.history.map((i: TGrid) => initGrid(i.meta, i.data));
      return Object.assign({}, state, { history });
    }
    return defaultState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_EDITOR, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};
