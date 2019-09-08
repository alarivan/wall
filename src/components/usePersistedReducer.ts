import { useReducer, useEffect } from 'react';
import { TState, TAction } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

type PersistedReducer = (
  reducer: React.Reducer<TState, TAction>,
  initialState: TState,
) => [TState, React.Dispatch<TAction>];

export const usePersistedReducer: PersistedReducer = (
  reducer,
  initialState,
) => {
  const init = (defaultState: TState): TState => {
    const persisted: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    return persisted !== null ? JSON.parse(persisted) : defaultState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
};
