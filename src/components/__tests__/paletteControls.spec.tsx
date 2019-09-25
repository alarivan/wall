import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import PaletteControls, { Props } from '../PaletteControls';
import { ThemeProvider } from 'styled-components';
import theme from '../../themes/default';

afterEach(cleanup);

const props: Props = {
  colors: ['red'],
  current: 'red',
  colorPicker: false,
  background: 'red',
  onColorClick: jest.fn(),
  onColorPickerClick: jest.fn(),
  onBackgroundClick: jest.fn(),
};

function withTheme(props: Props) {
  return (
    <ThemeProvider theme={theme}>
      <PaletteControls {...props} />
    </ThemeProvider>
  );
}

describe('PaletteControls', () => {
  it('renders correctly', () => {
    const { asFragment, getByTestId } = render(withTheme(props));

    expect(getByTestId('palette-controls-color-picker')).not.toHaveAttribute(
      'disabled',
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('disables color picker when it is active', () => {
    const { getByTestId } = render(withTheme({ ...props, colorPicker: true }));

    expect(getByTestId('palette-controls-color-picker')).toHaveAttribute(
      'disabled',
    );
  });

  it('calls onClick on correct buttons', () => {
    const { getByTestId } = render(withTheme(props));

    fireEvent.click(getByTestId('palette-controls-eraser'));
    fireEvent.click(getByTestId('palette-controls-color-picker'));

    expect(props.onColorClick).toHaveBeenCalledTimes(1);
    expect(props.onColorPickerClick).toHaveBeenCalledTimes(1);
  });
});
