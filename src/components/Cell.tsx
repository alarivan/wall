import styled from 'styled-components';

interface Props {
  readonly cellColor: string | null;
  readonly border?: boolean;
}

const StyledCell = styled.div<Props>`
  background: ${(props: Props) =>
    props.cellColor ? props.cellColor : 'transparent'};
  ${(props: Props) =>
    props.border ? 'border: 1px solid black;border-width: 0 1px 1px 0;' : ''}

  transition: transform 100ms ease-in-out;
  cursor: pointer;
  :hover {
    border-width: 1px;
    transform: scale(1.1);
  }
`;

export default StyledCell;
