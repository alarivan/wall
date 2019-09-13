import React from 'react';
import Cell from './Cell';
import StyledGrid from './StyledGrid';
import { TGrid, TColor } from '../types';
import { gridMap } from '../utils';

interface GridProps {
  grid: TGrid;
  brush: TColor;
  preview: boolean;
  onCellClick: (index: number, brush: TColor, color: TColor) => void;
}

const Grid: React.FC<GridProps> = ({ grid, brush, preview, onCellClick }) => {
  return (
    <StyledGrid {...grid.meta} preview={preview}>
      {gridMap(grid, (color, index) => (
        <Cell
          data-testid='grid-cell'
          onClick={() => onCellClick(index, brush, color)}
          key={index}
          border={!preview}
          cellColor={color}
        />
      ))}
    </StyledGrid>
  );
};

export default Grid;
