import React, { useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import styled from 'styled-components';

const Styled = styled.div`
  margin-bottom: 0.25rem;
  text-align: center;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);

  label {
    display: block;
    background-color: lightgray;
    padding: 0.25rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.25rem;
  }
`;

interface Props {
  label: string;
  min: number;
  max: number;
  name: string;
  value: number;
  onChange: (value: number) => void;
}

const GridControlsInput: React.FC<Props> = ({
  label,
  min,
  max,
  name,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useDebounce(value, onChange, 200);
  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();

    const value: number = parseInt(e.target.value);
    if (value >= min && value <= max) {
      setInputValue(value);
    }
  }

  return (
    <Styled>
      <label>{label}</label>
      <input
        data-testid='grid-controls-input'
        min={min}
        max={max}
        type='number'
        name={name}
        value={inputValue}
        onChange={handleChange}
      />
    </Styled>
  );
};

export default GridControlsInput;
