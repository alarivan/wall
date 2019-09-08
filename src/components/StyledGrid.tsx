import styled from 'styled-components';

interface StyledGridProps {
  readonly rows: number;
  readonly columns: number;
  readonly size: number;
  readonly preview: boolean;
}

function getBorderColor({ preview }: StyledGridProps): string {
  return preview ? 'black' : 'black white white black';
}

const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  justify-content: start;
  grid-gap: 0;
  grid-template-columns: repeat(
    ${props => props.columns + ', ' + props.size}px
  );
  grid-template-rows: repeat(${props => props.rows + ', ' + props.size}px);

  border-style: solid;
  border-width: 1px;
  border-color: ${getBorderColor};
  background: #c2c2d1;
`;

export default StyledGrid;
