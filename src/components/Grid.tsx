import React from 'react';
import Cell from './Cell';
import StyledGrid from './StyledGrid';
import { TGrid, TColor, TAction } from '../types';
import { paintAction } from './gridReducer';

interface GridProps {
  grid: TGrid;
  dispatch: React.Dispatch<TAction>;
  brush: TColor;
  preview: boolean;
}

const Grid: React.FC<GridProps> = ({ grid, dispatch, brush, preview }) => {
  return (
    <StyledGrid {...grid.meta} preview={preview}>
      {grid.data.map((color, index) => (
        <Cell
          data-testid='grid-cell'
          onClick={() => {
            dispatch(paintAction(index, brush));
          }}
          key={index}
          border={!preview}
          cellColor={color}
        />
      ))}
    </StyledGrid>
  );
};

export default Grid;
