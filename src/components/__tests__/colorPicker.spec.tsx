import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ColorPicker, { TriggerProps } from '../ColorPicker';

afterEach(cleanup);

describe('ColorPicker', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <ColorPicker
        onChangeComplete={jest.fn()}
        trigger={jest.fn()}
        color='red'
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders trigger and calls onClick method on trigger', () => {
    const openColorPicker = jest.fn();
    const props = {
      onChangeComplete: jest.fn(),
      trigger: (props: TriggerProps) => (
        <button
          {...props}
          onClick={openColorPicker}
          data-testid='color-picker-trigger'
        ></button>
      ),
      color: 'red',
    };
    const { getByTestId } = render(<ColorPicker {...props} />);

    fireEvent.click(getByTestId('color-picker-trigger'));

    expect(openColorPicker).toHaveBeenCalledTimes(1);
  });
});
