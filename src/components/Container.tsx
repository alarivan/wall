import React, { useState } from 'react';
import styled from 'styled-components';
import {
  gridReducer,
  initialState,
  clearAction,
  paintAction,
} from './gridReducer';
import { usePersistedReducer } from './usePersistedReducer';
import Grid from './Grid';
import PaletteControls from './PaletteControls';
import GridControls from './GridControls';
import { TColor } from '../types';
import { DEFAULT_PALETTE } from '../constants';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container: React.FC = () => {
  const [state, dispatch] = usePersistedReducer(gridReducer, initialState);
  const [current, setCurrent] = useState<TColor>(DEFAULT_PALETTE[0]);
  const [preview, setPreview] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  const handleCellClick = (index: number, brush: TColor, color: TColor) => {
    if (colorPicker) {
      setColorPicker(false);
      setCurrent(color);
    } else {
      dispatch(paintAction(index, brush));
    }
  };

  const handlePaletteColorClick = (color: TColor): void => {
    setColorPicker(false);
    setCurrent(color);
  };

  const handlePreviewClick = (): void => setPreview(!preview);

  const handleClearClick = (): void => dispatch(clearAction());

  const handleColorPickerClick = (): void => setColorPicker(!colorPicker);

  return (
    <StyledContainer>
      <GridControls
        dispatch={dispatch}
        state={state}
        onPreviewClick={handlePreviewClick}
      />
      <Grid
        brush={current}
        grid={state.history[state.current]}
        preview={preview}
        onCellClick={handleCellClick}
      />
      <PaletteControls
        current={current}
        colors={DEFAULT_PALETTE}
        colorPicker={colorPicker}
        onColorClick={handlePaletteColorClick}
        onClearClick={handleClearClick}
        onColorPickerClick={handleColorPickerClick}
      />
    </StyledContainer>
  );
};

export default Container;
