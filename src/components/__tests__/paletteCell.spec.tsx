import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PaletteCell from '../PaletteCell';

afterEach(cleanup);

describe('PaletteCell', () => {
  it('renders correctly', () => {
    const { asFragment, container } = render(<PaletteCell cellColor='red' />);

    expect(container.firstChild).toHaveStyleRule('border-radius', 'none');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with active', () => {
    const { asFragment, container } = render(
      <PaletteCell cellColor='red' active={true} />,
    );

    expect(container.firstChild).toHaveStyleRule('border-radius', '50%');

    expect(asFragment()).toMatchSnapshot();
  });
});
