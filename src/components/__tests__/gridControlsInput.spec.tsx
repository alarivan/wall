import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import GridControlsInput from '../GridControlsInput';

afterEach(cleanup);

const props = {
  label: 'label',
  min: 5,
  max: 10,
  value: 8,
  name: 'name',
  onChange: jest.fn(),
};

describe('GridControlsInput', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<GridControlsInput {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onChange when value is in allowed range', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <GridControlsInput {...props} onChange={onChange} />,
    );

    fireEvent.change(getByTestId('grid-controls-input'), {
      target: { value: 9 },
    });

    fireEvent.change(getByTestId('grid-controls-input'), {
      target: { value: 20 },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
