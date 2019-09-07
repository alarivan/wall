import React from 'react';

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
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    const value: number = parseInt(e.target.value);
    if (value >= min && value <= max) {
      onChange(value);
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
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default GridControlsInput;
