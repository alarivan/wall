import {
  TState,
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
  SET_STATE_ACTION,
  SET_STATE,
  TAction,
} from '../editor/types';
import { initGrid } from '../editor/utils';
import {
  gridReducer,
  initialState as realInitialState,
} from '../editor/reducer';
import {
  paintAction,
  updateBackgroundAction,
  clearAction,
  updateRowsAction,
  updateColumnsAction,
  updateSizeAction,
  setStateAction,
  resetAction,
  undoAction,
  redoAction,
} from '../editor/actions';

const initialState: TState = {
  history: [
    initGrid({ rows: 2, columns: 2, size: 10, background: 'blue' }, {}),
  ],
  current: 0,
};

const initialStateWithValues: TState = {
  history: [
    initGrid(
      { rows: 2, columns: 2, size: 10, background: 'blue' },
      { '0': 'white', '1': 'blue', '2': 'red', '3': 'black' },
    ),
  ],
  current: 0,
};

describe('gridReducer', () => {
  it('returns initial state', () => {
    const state: TState = gridReducer(initialState, { type: 'EMPTY' });

    expect(state).toEqual(state);
  });

  it('creates PAINT_ACTION', () => {
    const action: PAINT_ACTION = paintAction(1, 'red');

    expect(action).toEqual({
      type: PAINT,
      payload: { index: 1, color: 'red' },
    });
  });

  it('creates UPDATE_BACKGROUND_ACTION', () => {
    const action: UPDATE_BACKGROUND_ACTION = updateBackgroundAction('blue');

    expect(action).toEqual({
      type: UPDATE_BACKGROUND,
      payload: { color: 'blue' },
    });
  });

  it('creates CLEAR_ACTION', () => {
    const action: CLEAR_ACTION = clearAction();

    expect(action).toEqual({
      type: CLEAR,
    });
  });

  it('creates UPDATE_ROWS', () => {
    const action: UPDATE_ROWS_ACTION = updateRowsAction(3);

    expect(action).toEqual({
      type: UPDATE_ROWS,
      payload: {
        value: 3,
      },
    });
  });

  it('creates UPDATE_COLUMNS', () => {
    const action: UPDATE_COLUMNS_ACTION = updateColumnsAction(3);

    expect(action).toEqual({
      type: UPDATE_COLUMNS,
      payload: {
        value: 3,
      },
    });
  });

  it('creates UPDATE_SIZE', () => {
    const action: UPDATE_SIZE_ACTION = updateSizeAction(3);

    expect(action).toEqual({
      type: UPDATE_SIZE,
      payload: {
        value: 3,
      },
    });
  });

  it('creates SET_STATE', () => {
    const action: SET_STATE_ACTION = setStateAction(initialState);

    expect(action).toEqual({
      type: SET_STATE,
      payload: {
        value: initialState,
      },
    });
  });

  it('updates state on "PAINT" action ', () => {
    const action: TAction = paintAction(1, 'red');
    const state: TState = gridReducer(initialState, action);

    const updatedState: TState = Object.assign({}, initialState, {
      history: [
        ...initialState.history,
        Object.assign({}, initialState.history[0], {
          data: { '1': 'red' },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });

  it('updates state on "UPDATE_BACKGROUND" action ', () => {
    const action: TAction = updateBackgroundAction('red');
    const state: TState = gridReducer(initialState, action);

    const updatedState: TState = Object.assign({}, initialState, {
      history: [
        ...initialState.history,
        Object.assign({}, initialState.history[0], {
          meta: { ...initialState.history[0].meta, background: 'red' },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });
  it('updates state on "CLEAR" action ', () => {
    const action: TAction = clearAction();
    const state: TState = gridReducer(initialState, action);

    const updatedState: TState = Object.assign({}, initialState, {
      history: [
        ...initialState.history,
        Object.assign({}, initialState.history[0], {
          data: {},
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });

  it('correctly updates state when number of rows is increased', () => {
    const action: TAction = updateRowsAction(3);
    const state: TState = gridReducer(initialStateWithValues, action);

    const updatedState: TState = Object.assign({}, initialStateWithValues, {
      history: [
        ...initialStateWithValues.history,
        Object.assign({}, initialStateWithValues.history[0], {
          data: { '0': 'white', '1': 'blue', '2': 'red', '3': 'black' },
          meta: {
            ...initialStateWithValues.history[0].meta,
            rows: 3,
            length: 6,
          },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });
  it('correctly updates state when number of rows is decreased', () => {
    const action: TAction = updateRowsAction(1);
    const state: TState = gridReducer(initialStateWithValues, action);

    const updatedState: TState = Object.assign({}, initialStateWithValues, {
      history: [
        ...initialStateWithValues.history,
        Object.assign({}, initialStateWithValues.history[0], {
          data: { '0': 'white', '1': 'blue' },
          meta: {
            ...initialStateWithValues.history[0].meta,
            rows: 1,
            length: 2,
          },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });

  it('correctly updates state when number of columns is increased', () => {
    const action: TAction = updateColumnsAction(3);
    const state: TState = gridReducer(initialStateWithValues, action);

    const updatedState: TState = Object.assign({}, initialStateWithValues, {
      history: [
        ...initialStateWithValues.history,
        Object.assign({}, initialStateWithValues.history[0], {
          data: { '0': 'white', '1': 'blue', '3': 'red', '4': 'black' },
          meta: {
            ...initialStateWithValues.history[0].meta,
            columns: 3,
            length: 6,
          },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });
  it('correctly updates state when number of columns is decreased', () => {
    const action: TAction = updateColumnsAction(1);
    const state: TState = gridReducer(initialStateWithValues, action);

    const updatedState: TState = Object.assign({}, initialStateWithValues, {
      history: [
        ...initialStateWithValues.history,
        Object.assign({}, initialStateWithValues.history[0], {
          data: { '0': 'white', '1': 'red' },
          meta: {
            ...initialStateWithValues.history[0].meta,
            columns: 1,
            length: 2,
          },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });

  it('updates state on "UPDATE_SIZE" action ', () => {
    const action: TAction = updateSizeAction(20);
    const state: TState = gridReducer(initialStateWithValues, action);

    const updatedState: TState = Object.assign({}, initialStateWithValues, {
      history: [
        ...initialStateWithValues.history,
        Object.assign({}, initialStateWithValues.history[0], {
          meta: { ...initialStateWithValues.history[0].meta, size: 20 },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });

  it('resets state on "RESET" action', () => {
    const action: TAction = resetAction();
    const updatedState: TState = gridReducer(initialState, action);

    expect(updatedState).toEqual(realInitialState);
  });

  it('correctly updates history', () => {
    const updatedSizeState = gridReducer(initialState, updateSizeAction(20));
    const updatedColumnsState = gridReducer(
      updatedSizeState,
      updateColumnsAction(3),
    );
    const updatedRowsState = gridReducer(
      updatedColumnsState,
      updateRowsAction(3),
    );
    const paintedState = gridReducer(updatedRowsState, paintAction(1, 'red'));
    const finalState = gridReducer(paintedState, clearAction());

    expect(finalState.history.length).toBe(6);

    const undoState = gridReducer(finalState, undoAction());
    expect(undoState).toEqual(Object.assign({}, finalState, { current: 4 }));
    const redoState = gridReducer(undoState, redoAction());
    expect(redoState).toEqual(finalState);
  });

  it('updates state on "SET_STATE" action', () => {
    const action: SET_STATE_ACTION = setStateAction(initialStateWithValues);
    const updatedState: TState = gridReducer(initialState, action);

    expect(updatedState).toEqual(initialStateWithValues);
  });
});
