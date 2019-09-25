import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { TGrid } from '../../types';
import Grid from '../Grid';
import { initGrid } from '../../reducers/editor/utils';

afterEach(cleanup);

const initialState: TGrid = initGrid({
  id: 'fake_id',
  columns: 2,
  rows: 2,
  size: 10,
  length: 4,
  background: 'red',
});

describe('Grid', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Grid
        grid={initialState}
        onCellClick={jest.fn()}
        preview={false}
        brush='red'
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('call onCellClick', () => {
    const props = {
      grid: initialState,
      onCellClick: jest.fn(),
      preview: false,
      brush: 'red',
    };
    const { queryAllByTestId } = render(<Grid {...props} />);

    fireEvent.click(queryAllByTestId('grid-cell')[0]);

    expect(props.onCellClick).toHaveBeenCalledTimes(1);
  });
});
