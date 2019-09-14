import React from 'react';
import Cell from './Cell';
import StyledGrid from './StyledGrid';
import { TGrid } from '../types';
import { gridMap } from '../utils';

interface SimpleGridProps {
  grid: TGrid;
  preview: boolean;
}

const SimpleGrid: React.FC<SimpleGridProps> = ({ grid, preview }) => {
  return (
    <StyledGrid {...grid.meta} preview={preview}>
      {gridMap(grid, (color, index) => (
        <Cell
          data-testid='grid-cell'
          key={index}
          border={!preview}
          cellColor={color}
        />
      ))}
    </StyledGrid>
  );
};

export default SimpleGrid;
