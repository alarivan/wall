import React, { Dispatch } from 'react';
import styled from 'styled-components';
import GridControlsInput from './GridControlsInput';
import {
  updateRowsAction,
  updateColumnsAction,
  updateSizeAction,
  undoAction,
  redoAction,
  resetAction,
} from '../reducers/gridReducer';
import { TAction, TState } from '../types';
import {
  MIN_ROWS_VALUE,
  MAX_ROWS_VALUE,
  MIN_COLUMNS_VALUE,
  MAX_COLUMNS_VALUE,
  MIN_WIDTH_VALUE,
  MAX_WIDTH_VALUE,
} from '../constants';

interface Props {
  state: TState;
  dispatch: Dispatch<TAction>;
  onPreviewClick: () => void;
}

const StyledControls = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const GridControls: React.FC<Props> = ({ state, dispatch, onPreviewClick }) => {
  const grid = state.history[state.current];
  function handleRowsChange(value: number): void {
    dispatch(updateRowsAction(value));
  }

  function handleColumnsChange(value: number): void {
    dispatch(updateColumnsAction(value));
  }

  function handleSizeChange(value: number): void {
    dispatch(updateSizeAction(value));
  }

  function handleUndoClick(): void {
    dispatch(undoAction());
  }
  function handleRedoClick(): void {
    dispatch(redoAction());
  }
  function handleResetClick(): void {
    dispatch(resetAction());
  }

  return (
    <StyledControls>
      <button onClick={onPreviewClick}>preview</button>
      <button onClick={handleUndoClick}>undo</button>
      <button onClick={handleRedoClick}>redo</button>
      <GridControlsInput
        label='Rows'
        min={MIN_ROWS_VALUE}
        max={MAX_ROWS_VALUE}
        name='rows'
        value={grid.meta.rows}
        onChange={handleRowsChange}
      />
      <GridControlsInput
        label='Columns'
        min={MIN_COLUMNS_VALUE}
        max={MAX_COLUMNS_VALUE}
        name='rows'
        value={grid.meta.columns}
        onChange={handleColumnsChange}
      />
      <GridControlsInput
        label='Size'
        min={MIN_WIDTH_VALUE}
        max={MAX_WIDTH_VALUE}
        name='size'
        value={grid.meta.size}
        onChange={handleSizeChange}
      />
      <button onClick={handleResetClick}>reset</button>
    </StyledControls>
  );
};

export default GridControls;
