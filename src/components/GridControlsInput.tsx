import React, { useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

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
    <>
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
    </>
  );
};

export default GridControlsInput;
