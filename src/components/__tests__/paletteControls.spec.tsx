import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import PaletteControls, { Props } from '../PaletteControls';

afterEach(cleanup);

const props: Props = {
  colors: ['red'],
  current: 'red',
  colorPicker: false,
  onColorClick: jest.fn(),
  onClearClick: jest.fn(),
  onColorPickerClick: jest.fn(),
};

describe('PaletteControls', () => {
  it('renders correctly', () => {
    const { asFragment, getByTestId } = render(<PaletteControls {...props} />);

    expect(getByTestId('palette-controls-color-picker')).not.toHaveAttribute(
      'disabled',
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('disables color picker when it is active', () => {
    const { getByTestId } = render(
      <PaletteControls {...props} colorPicker={true} />,
    );

    expect(getByTestId('palette-controls-color-picker')).toHaveAttribute(
      'disabled',
    );
  });

  it('calls onClick on correct buttons', () => {
    const { getByTestId } = render(<PaletteControls {...props} />);

    fireEvent.click(getByTestId('palette-controls-eraser'));
    fireEvent.click(getByTestId('palette-controls-clear'));
    fireEvent.click(getByTestId('palette-controls-color-picker'));

    expect(props.onColorClick).toHaveBeenCalledTimes(1);
    expect(props.onClearClick).toHaveBeenCalledTimes(1);
    expect(props.onColorPickerClick).toHaveBeenCalledTimes(1);
  });
});
