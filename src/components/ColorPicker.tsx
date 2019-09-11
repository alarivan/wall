import React, { useState, useEffect, useRef } from 'react';
import { TColor } from '../types';
import { SketchPicker, ColorResult } from 'react-color';
import styled from 'styled-components';

export interface TriggerProps {
  style: React.CSSProperties;
  onClick: () => void;
}

interface Props {
  color?: TColor;
  onChangeComplete: (colorResult: ColorResult) => void;
  trigger: (props: TriggerProps) => JSX.Element;
}

const StyledDiv = styled.div`
  position: relative;
`;
const StyledPicker = styled(SketchPicker)`
  position: absolute;
  bottom: 0;
  right: 100%;
`;

const ColorPicker: React.FC<Props> = ({ color, onChangeComplete, trigger }) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapper = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);

    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  });

  const handleOutsideClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (wrapper.current && wrapper.current.contains(target)) return;

    setOpen(false);
  };

  const handleClick = () => setOpen(!open);

  return (
    <StyledDiv ref={wrapper}>
      {trigger({ style: { background: color }, onClick: handleClick })}
      {open && (
        <StyledPicker color={color} onChangeComplete={onChangeComplete} />
      )}
    </StyledDiv>
  );
};

export default ColorPicker;
