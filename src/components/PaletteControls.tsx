import React from 'react';
import styled from 'styled-components';
import Palette from './Palette';
import { TColor } from '../types';

export interface Props {
  colors: TColor[];
  current: TColor;
  colorPicker: boolean;
  onColorClick: (color: TColor) => void;
  onClearClick: () => void;
  onColorPickerClick: () => void;
}

const StyledPaletteControls = styled.div`
  padding: 0 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2px;
  align-content: start;
`;

const PaletteControls: React.FC<Props> = ({
  current,
  colors,
  colorPicker,
  onColorClick,
  onClearClick,
  onColorPickerClick,
}) => {
  function handleEraserClick() {
    onColorClick(undefined);
  }

  return (
    <StyledPaletteControls>
      <Palette onColorClick={onColorClick} current={current} colors={colors} />
      <button data-testid='palette-controls-eraser' onClick={handleEraserClick}>
        eraser
      </button>
      <button data-testid='palette-controls-clear' onClick={onClearClick}>
        clear
      </button>
      <button
        data-testid='palette-controls-color-picker'
        disabled={colorPicker}
        onClick={onColorPickerClick}
      >
        pick color
      </button>
    </StyledPaletteControls>
  );
};

export default PaletteControls;
