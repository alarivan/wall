import React from 'react';
import { render, cleanup } from '@testing-library/react';
import StyledGrid from '../StyledGrid';

afterEach(cleanup);

const props = {
  columns: 2,
  rows: 2,
  size: 10,
  preview: false,
  background: 'red',
};

describe('StyledGrid', () => {
  it('renders correctly', () => {
    const { asFragment, container } = render(<StyledGrid {...props} />);

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-columns',
      'repeat( 2,10px )',
    );

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-rows',
      'repeat(2,10px)',
    );

    expect(container.firstChild).toHaveStyleRule(
      'border-color',
      'black white white black',
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with preview', () => {
    const { asFragment, container } = render(
      <StyledGrid {...props} preview={true} />,
    );

    expect(container.firstChild).toHaveStyleRule('border-color', 'black');

    expect(asFragment()).toMatchSnapshot();
  });
});
