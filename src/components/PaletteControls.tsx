import React from 'react';
import styled from 'styled-components';
import Palette from './Palette';
import { TColor } from '../types';
import ColorPicker from './ColorPicker';
import { ColorResult } from 'react-color';

export interface Props {
  colors: TColor[];
  current: TColor;
  colorPicker: boolean;
  background: TColor;
  onColorClick: (color: TColor) => void;
  onClearClick: () => void;
  onColorPickerClick: () => void;
  onBackgroundClick: (colorResult: ColorResult) => void;
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
  background,
  onColorClick,
  onClearClick,
  onColorPickerClick,
  onBackgroundClick,
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
      <ColorPicker
        trigger={props => <button {...props}>background</button>}
        color={background}
        onChangeComplete={onBackgroundClick}
      />
    </StyledPaletteControls>
  );
};

export default PaletteControls;
