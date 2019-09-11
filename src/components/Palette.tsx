import React from 'react';
import styled from 'styled-components';
import PaletteCell from './PaletteCell';
import { TColor } from '../types';
import ColorPicker from './ColorPicker';

interface Props {
  colors: TColor[];
  current: TColor;
  onColorClick: (color: TColor) => void;
}
const StyledPalette = styled.div`
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(3, 20px);
  grid-auto-rows: 20px;
  align-self: start;
  background: #c2c2d1;
  padding: 0.25rem;
`;

const Palette: React.FC<Props> = ({ onColorClick, current, colors }) => {
  return (
    <StyledPalette>
      {colors.map((color, index) => (
        <PaletteCell
          data-testid='palette-cell'
          key={index}
          onClick={() => onColorClick(color)}
          cellColor={color}
          active={current === color}
        />
      ))}
      <ColorPicker
        color={current}
        trigger={props => <PaletteCell {...props} />}
        onChangeComplete={colorResult => onColorClick(colorResult.hex)}
      />
    </StyledPalette>
  );
};

export default Palette;
