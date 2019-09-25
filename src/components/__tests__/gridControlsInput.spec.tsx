import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import GridControlsInput from '../GridControls/Input';

afterEach(cleanup);

const props = {
  label: 'label',
  min: 5,
  max: 10,
  value: 8,
  name: 'name',
  onChange: jest.fn(),
};

const timer = (callback: () => void, delay: number) => {
  new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });
};

describe('GridControlsInput', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<GridControlsInput {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onChange when value is in allowed range only after delay', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <GridControlsInput {...props} onChange={onChange} />,
    );
    const input = getByTestId('grid-controls-input');

    fireEvent.change(input, { target: { value: 9 } });
    fireEvent.change(input, { target: { value: 5 } });
    fireEvent.change(input, { target: { value: 20 } });

    jest.useFakeTimers();

    timer(() => {
      fireEvent.change(input, { target: { value: 9 } });
    }, 300);
    timer(() => {
      fireEvent.change(input, { target: { value: 20 } });
    }, 300);
    timer(() => {
      fireEvent.change(input, { target: { value: 5 } });
    }, 300);

    timer(() => {
      expect(onChange).toHaveBeenCalledTimes(2);
    }, 300);

    jest.runAllTimers();
  });
});
