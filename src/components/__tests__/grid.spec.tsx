import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { TGrid } from '../../types';
import Grid from '../Grid';

afterEach(cleanup);

const initialState: TGrid = {
  meta: {
    columns: 2,
    rows: 2,
    width: 10,
  },
  data: new Array(4).fill(null),
};

describe('Grid', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Grid
        grid={initialState}
        dispatch={jest.fn()}
        preview={false}
        brush='red'
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('call dispatch', () => {
    const props = {
      grid: initialState,
      dispatch: jest.fn(),
      preview: false,
      brush: 'red',
    };
    const { queryAllByTestId } = render(<Grid {...props} />);

    fireEvent.click(queryAllByTestId('grid-cell')[0]);

    expect(props.dispatch).toHaveBeenCalledTimes(1);
  });
});
