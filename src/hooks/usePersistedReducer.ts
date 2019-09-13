import { useReducer, useEffect } from 'react';

export function usePersistedReducer<S, A>(
  reducer: React.Reducer<S, A>,
  initialState: S,
  localStorageKey: string,
  init: (state: S) => S,
): [S, React.Dispatch<A>] {
  const _init = (defaultState: S): S => {
    const persisted: string | null = localStorage.getItem(localStorageKey);

    if (persisted) {
      const state = JSON.parse(persisted);
      return init(state);
    }

    return defaultState;
  };

  const [state, dispatch] = useReducer(reducer, initialState, _init);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, dispatch];
}
