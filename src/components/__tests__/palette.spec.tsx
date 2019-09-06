import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Palette from '../Palette';

afterEach(cleanup);

describe('Palette', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Palette
        colors={['white', 'blue', 'red']}
        current={'red'}
        onColorClick={jest.fn()}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onColorClick', () => {
    const onColorClick = jest.fn();
    const { queryAllByTestId } = render(
      <Palette
        colors={['white', 'blue', 'red']}
        current={'red'}
        onColorClick={onColorClick}
      />,
    );

    fireEvent.click(queryAllByTestId('palette-cell')[0]);

    expect(onColorClick).toHaveBeenCalledTimes(1);
  });
});
