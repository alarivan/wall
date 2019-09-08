import {
  gridReducer,
  paintAction,
  clearAction,
  updateRowsAction,
  updateColumnsAction,
  updateWidthAction,
} from '../gridReducer';
import {
  TState,
  TAction,
  PAINT,
  PAINT_ACTION,
  CLEAR,
  CLEAR_ACTION,
  UPDATE_ROWS,
  UPDATE_ROWS_ACTION,
  UPDATE_COLUMNS,
  UPDATE_COLUMNS_ACTION,
  UPDATE_WIDTH_ACTION,
  UPDATE_WIDTH,
} from '../../types';

const initialState: TState = {
  history: [
    {
      meta: {
        columns: 2,
        rows: 2,
        width: 10,
      },
      data: Array(4).fill(null),
    },
  ],
  current: 0,
};

const initialStateWithValues: TState = {
  history: [
    {
      meta: {
        columns: 2,
        rows: 2,
        width: 10,
      },
      data: ['white', 'blue', 'red', 'black'],
    },
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

  it('creates UPDATE_WIDTH', () => {
    const action: UPDATE_WIDTH_ACTION = updateWidthAction(3);

    expect(action).toEqual({
      type: UPDATE_WIDTH,
      payload: {
        value: 3,
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
          data: [null, 'red', null, null],
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
          data: [null, null, null, null],
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
          data: ['white', 'blue', 'red', 'black', null, null],
          meta: { ...initialStateWithValues.history[0].meta, rows: 3 },
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
          data: ['white', 'blue'],
          meta: { ...initialStateWithValues.history[0].meta, rows: 1 },
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
          data: ['white', 'blue', null, 'red', 'black', null],
          meta: { ...initialStateWithValues.history[0].meta, columns: 3 },
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
          data: ['white', 'red'],
          meta: { ...initialStateWithValues.history[0].meta, columns: 1 },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });

  it('updates state on "UPDATE_WIDTH" action ', () => {
    const action: TAction = updateWidthAction(20);
    const state: TState = gridReducer(initialStateWithValues, action);

    const updatedState: TState = Object.assign({}, initialStateWithValues, {
      history: [
        ...initialStateWithValues.history,
        Object.assign({}, initialStateWithValues.history[0], {
          meta: { ...initialStateWithValues.history[0].meta, width: 20 },
        }),
      ],
      current: 1,
    });

    expect(state).toEqual(updatedState);
  });
});
