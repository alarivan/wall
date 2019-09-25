import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from './Grid';
import PaletteControls from './PaletteControls';
import GridControls from './GridControls';
import { TState, TAction } from '../reducers/editor/types';
import { TColor } from '../types';
import { DEFAULT_PALETTE } from '../constants';
import { ColorResult } from 'react-color';
import {
  paintAction,
  updateBackgroundAction,
} from '../reducers/editor/actions';

interface Props {
  state: TState;
  dispatch: React.Dispatch<TAction>;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
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
        onColorPickerClick={handleColorPickerClick}
        onBackgroundClick={handleBackgroundClick}
      />
    </StyledContainer>
  );
};

export default Container;
