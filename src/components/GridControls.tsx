import React, { Dispatch, useCallback, useContext } from 'react';
import styled from 'styled-components';
import GridControlsInput from './GridControls/Input';
import {
  updateRowsAction,
  updateColumnsAction,
  updateSizeAction,
  undoAction,
  redoAction,
  resetAction,
  clearAction,
} from '../reducers/editor/actions';
import { TState, TAction } from '../reducers/editor/types';
import {
  MIN_ROWS_VALUE,
  MAX_ROWS_VALUE,
  MIN_COLUMNS_VALUE,
  MAX_COLUMNS_VALUE,
  MIN_WIDTH_VALUE,
  MAX_WIDTH_VALUE,
} from '../constants';
import { GalleryContext } from '../GalleryContext';
import { saveAction } from '../reducers/gallery/actions';
import GridControlsButton from './GridControls/Button';
import {
  ResetButton,
  ClearButton,
  PreviewButton,
  SaveButton,
} from './GridControls/buttons';
import { toast } from 'react-toastify';

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
  const { dispatch: galleryDispatch } = useContext(GalleryContext);
  const grid = state.history[state.current];

  const handleRowsChange = useCallback(
    (value: number) => {
      dispatch(updateRowsAction(value));
    },
    [dispatch],
  );

  const handleColumnsChange = useCallback(
    (value: number) => {
      dispatch(updateColumnsAction(value));
    },
    [dispatch],
  );

  const handleSizeChange = useCallback(
    (value: number) => {
      dispatch(updateSizeAction(value));
    },
    [dispatch],
  );

  function handleUndoClick(): void {
    dispatch(undoAction());
  }
  function handleRedoClick(): void {
    dispatch(redoAction());
  }
  function handleResetClick(): void {
    dispatch(resetAction());
  }
  function handleClearClick(): void {
    dispatch(clearAction());
  }

  function handleSave() {
    galleryDispatch(saveAction(grid));
    toast.success('Saved!');
  }

  return (
    <StyledControls>
      <SaveButton onClick={handleSave}>save</SaveButton>
      <PreviewButton onClick={onPreviewClick}>preview</PreviewButton>
      <GridControlsButton onClick={handleUndoClick}>undo</GridControlsButton>
      <GridControlsButton onClick={handleRedoClick}>redo</GridControlsButton>
      <ClearButton onClick={handleClearClick}>clear</ClearButton>
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
      <ResetButton onClick={handleResetClick}>reset</ResetButton>
    </StyledControls>
  );
};

export default GridControls;
