import styled from 'styled-components';

interface Props {
  readonly cellColor?: string;
  readonly border?: boolean;
}

function getCellColor({ cellColor }: Props): string {
  return cellColor ? cellColor : 'transparent';
}

function getBorder(props: Props): string {
  return props.border ? 'black' : getCellColor(props);
}

const StyledCell = styled.div<Props>`
  background: ${getCellColor};
  border-style: solid;
  border-color: ${getBorder};
  border-width: 0 1px 1px 0;
  transition: transform 100ms ease-in-out;
  cursor: pointer;

  :hover {
    border-width: 1px;
    transform: scale(1.1);
  }
`;

export default StyledCell;
