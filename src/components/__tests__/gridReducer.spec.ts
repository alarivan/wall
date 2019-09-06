import { gridReducer, paintAction, clearAction } from '../gridReducer';
import {
  TGrid,
  TAction,
  PAINT,
  PAINT_ACTION,
  CLEAR,
  CLEAR_ACTION,
} from '../../types';

const initialState: TGrid = {
  meta: {
    columns: 2,
    rows: 2,
    width: 10,
  },
  data: new Array(4).fill(null),
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
});
