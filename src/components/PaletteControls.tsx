import React from 'react';
import styled from 'styled-components';
import Palette from './Palette';
import { TColor } from '../types';
import ColorPicker from './ColorPicker';
import { ColorResult } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEraser,
  faFill,
  faEyeDropper,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import PaletteControlsButton from './PaletteControls/Button';

export interface Props {
  colors: TColor[];
  current: TColor;
  colorPicker: boolean;
  background: TColor;
  onColorClick: (color: TColor) => void;
  onColorPickerClick: () => void;
  onBackgroundClick: (colorResult: ColorResult) => void;
}

const StyledPaletteControls = styled.div`
  padding: 0 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.25rem;
  align-content: start;
`;

const ButtonsGrid = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-gap: 2px;
  display: grid;
`;

const PaletteControls: React.FC<Props> = ({
  current,
  colors,
  colorPicker,
  background,
  onColorClick,
  onColorPickerClick,
  onBackgroundClick,
}) => {
  function handleEraserClick() {
    onColorClick(undefined);
  }

  return (
    <StyledPaletteControls>
      <Palette onColorClick={onColorClick} current={current} colors={colors} />
      <ButtonsGrid>
        <ColorPicker
          color={current}
          trigger={props => (
            <PaletteControlsButton bgColor={current} {...props}>
              <FontAwesomeIcon icon={faPalette} />
            </PaletteControlsButton>
          )}
          onChangeComplete={colorResult => onColorClick(colorResult.hex)}
        />
        <ColorPicker
          trigger={props => (
            <PaletteControlsButton bgColor={background} {...props}>
              <FontAwesomeIcon icon={faFill} />
            </PaletteControlsButton>
          )}
          color={background}
          onChangeComplete={onBackgroundClick}
        />
        <PaletteControlsButton
          data-testid='palette-controls-eraser'
          onClick={handleEraserClick}
        >
          <FontAwesomeIcon icon={faEraser} />
        </PaletteControlsButton>
        <PaletteControlsButton
          data-testid='palette-controls-color-picker'
          disabled={colorPicker}
          onClick={onColorPickerClick}
        >
          <FontAwesomeIcon icon={faEyeDropper} />
        </PaletteControlsButton>
      </ButtonsGrid>
    </StyledPaletteControls>
  );
};

export default PaletteControls;
