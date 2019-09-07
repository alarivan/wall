import {
  gridReducer,
  paintAction,
  clearAction,
  updateRowsAction,
  updateColumnsAction,
  updateWidthAction,
} from '../gridReducer';
import {
  TGrid,
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

const initialState: TGrid = {
  meta: {
    columns: 2,
    rows: 2,
    width: 10,
  },
  data: new Array(4).fill(null),
};

const initialStateWithValues: TGrid = {
  meta: {
    columns: 2,
    rows: 2,
    width: 10,
  },
  data: ['white', 'blue', 'red', 'black'],
};

describe('gridReducer', () => {
  it('returns initial state', () => {
    const state: TGrid = gridReducer(initialState, { type: 'EMPTY' });

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
    const state: TGrid = gridReducer(initialState, action);

    const updatedState: TGrid = Object.assign({}, initialState, {
      data: [null, 'red', null, null],
    });

    expect(state).toEqual(updatedState);
  });

  it('updates state on "CLEAR" action ', () => {
    const action: TAction = clearAction();
    const state: TGrid = gridReducer(initialState, action);

    const updatedState: TGrid = Object.assign({}, initialState, {
      data: [null, null, null, null],
    });

    expect(state).toEqual(updatedState);
  });

  it('correctly updates state when number of rows is increased', () => {
    const action: TAction = updateRowsAction(3);
    const state: TGrid = gridReducer(initialStateWithValues, action);

    const updatedState: TGrid = Object.assign({}, initialStateWithValues, {
      data: ['white', 'blue', 'red', 'black', null, null],
      meta: { ...initialStateWithValues.meta, rows: 3 },
    });

    expect(state).toEqual(updatedState);
  });
  it('correctly updates state when number of rows is decreased', () => {
    const action: TAction = updateRowsAction(1);
    const state: TGrid = gridReducer(initialStateWithValues, action);

    const updatedState: TGrid = Object.assign({}, initialStateWithValues, {
      data: ['white', 'blue'],
      meta: { ...initialStateWithValues.meta, rows: 1 },
    });

    expect(state).toEqual(updatedState);
  });

  it('correctly updates state when number of columns is increased', () => {
    const action: TAction = updateColumnsAction(3);
    const state: TGrid = gridReducer(initialStateWithValues, action);

    const updatedState: TGrid = Object.assign({}, initialStateWithValues, {
      data: ['white', 'blue', null, 'red', 'black', null],
      meta: { ...initialStateWithValues.meta, columns: 3 },
    });

    expect(state).toEqual(updatedState);
  });
  it('correctly updates state when number of columns is decreased', () => {
    const action: TAction = updateColumnsAction(1);
    const state: TGrid = gridReducer(initialStateWithValues, action);

    const updatedState: TGrid = Object.assign({}, initialStateWithValues, {
      data: ['white', 'red'],
      meta: { ...initialStateWithValues.meta, columns: 1 },
    });

    expect(state).toEqual(updatedState);
  });

  it('updates state on "UPDATE_WIDTH" action ', () => {
    const action: TAction = updateWidthAction(20);
    const state: TGrid = gridReducer(initialStateWithValues, action);

    const updatedState: TGrid = Object.assign({}, initialStateWithValues, {
      meta: { ...initialStateWithValues.meta, width: 20 },
    });

    expect(state).toEqual(updatedState);
  });
});
