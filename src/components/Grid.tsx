import React from 'react';
import Cell from './Cell';
import StyledGrid from './StyledGrid';
import { TGrid, TColor } from '../types';

interface GridProps {
  grid: TGrid;
  brush: TColor;
  preview: boolean;
  onCellClick: (index: number, brush: TColor, color: TColor) => void;
}

function gridMap(
  grid: TGrid,
  callback: (item: TColor, index: number) => any,
): Element[] {
  let result = [];
  let index = 0;
  for (const item of grid) {
    result.push(callback(item, index++));
  }
  return result;
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
