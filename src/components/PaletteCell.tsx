import styled from 'styled-components';
import Cell from './Cell';

interface PaletteCellProps {
  active?: boolean;
}

const PaletteCell = styled(Cell)<PaletteCellProps>`
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  border-style: solid;
  border-color: black;
  border-width: 0;
  border-radius: ${({ active }) => (active ? '50%' : 'none')};
  transition: border-radius 50ms ease-in-out;
  height: 100%;

  :hover {
    border-width: 0;
    border-radius: ${({ active }) => (active ? '50%' : 'none')};
  }
`;

export default PaletteCell;
