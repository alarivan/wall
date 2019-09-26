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
import {
  EraserButton,
  BackgroundButton,
  ColorPickerButton,
  CustomColorButton,
} from './PaletteControls/buttons';

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
            <CustomColorButton bgColor={current} {...props}>
              <FontAwesomeIcon icon={faPalette} />
            </CustomColorButton>
          )}
          onChangeComplete={colorResult => onColorClick(colorResult.hex)}
        />
        <ColorPicker
          trigger={props => (
            <BackgroundButton bgColor={background} {...props}>
              <FontAwesomeIcon icon={faFill} />
            </BackgroundButton>
          )}
          color={background}
          onChangeComplete={onBackgroundClick}
        />
        <EraserButton
          data-testid='palette-controls-eraser'
          onClick={handleEraserClick}
        >
          <FontAwesomeIcon icon={faEraser} />
        </EraserButton>
        <ColorPickerButton
          data-testid='palette-controls-color-picker'
          disabled={colorPicker}
          onClick={onColorPickerClick}
        >
          <FontAwesomeIcon icon={faEyeDropper} />
        </ColorPickerButton>
      </ButtonsGrid>
    </StyledPaletteControls>
  );
};

export default PaletteControls;
