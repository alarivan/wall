import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Cell from '../Cell';

afterEach(cleanup);

describe('Cell', () => {
  it('renders correctly', () => {
    const { asFragment, container } = render(<Cell cellColor={null} />);

    expect(container.firstChild).toHaveStyleRule('background', 'transparent');
    expect(container.firstChild).toHaveStyleRule('border-color', 'transparent');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const props = { cellColor: 'red', border: true };
    const { asFragment, container } = render(<Cell {...props} />);

    expect(container.firstChild).toHaveStyleRule('background', 'red');
    expect(container.firstChild).toHaveStyleRule('border-color', 'black');
    expect(asFragment()).toMatchSnapshot();
  });
});
