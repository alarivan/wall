import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ActionPanel from '../Gallery/Item/ActionPanel';
import { ThemeProvider } from 'styled-components';
import theme from '../../themes/default';

afterEach(cleanup);

describe('ActionPanel', () => {
  it('renders correctly', () => {
    const onDelete = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ActionPanel gridId={'id'} onDelete={onDelete} />
      </ThemeProvider>,
    );

    fireEvent.click(getByText(/delete/i));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
