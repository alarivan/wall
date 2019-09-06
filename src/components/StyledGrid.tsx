import styled from 'styled-components';

interface StyledGridProps {
  readonly rows: number;
  readonly columns: number;
  readonly width: number;
  readonly preview: boolean;
}

const StyledGrid = styled.div<StyledGridProps>`
  display: grid;
  justify-content: start;
  grid-gap: 0;
  grid-template-columns: repeat(
    ${props => props.columns + ', ' + props.width}px
  );
  grid-template-rows: repeat(${props => props.rows + ', ' + props.width}px);

  border: 1px solid black;
  border-width: ${({ preview }) => (preview ? '1px' : '1px 0px 0px 1px')};
`;

export default StyledGrid;
