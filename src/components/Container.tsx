import React, { useState } from 'react';
import styled from 'styled-components';
import {
  clearAction,
  paintAction,
  updateBackgroundAction,
} from '../reducers/gridReducer';
import Grid from './Grid';
import PaletteControls from './PaletteControls';
import GridControls from './GridControls';
import { TColor, TState, TAction } from '../types';
import { DEFAULT_PALETTE } from '../constants';
import { ColorResult } from 'react-color';

interface Props {
  state: TState;
  dispatch: React.Dispatch<TAction>;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container: React.FC<Props> = ({ state, dispatch }) => {
  const [current, setCurrent] = useState<TColor>(DEFAULT_PALETTE[0]);
  const [preview, setPreview] = useState<boolean>(false);
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const currentGrid = state.history[state.current];

  const handleCellClick = (index: number, brush: TColor, color: TColor) => {
    if (colorPicker) {
      setColorPicker(false);
      setCurrent(color);
    } else {
      dispatch(paintAction(index, brush));
    }
  };

  const handleBackgroundClick = (colorResult: ColorResult) => {
    dispatch(updateBackgroundAction(colorResult.hex));
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
        background={currentGrid.meta.background}
        onColorClick={handlePaletteColorClick}
        onClearClick={handleClearClick}
        onColorPickerClick={handleColorPickerClick}
        onBackgroundClick={handleBackgroundClick}
      />
    </StyledContainer>
  );
};

export default Container;
