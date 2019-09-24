import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ActionPanel from '../Gallery/Item/ActionPanel';

afterEach(cleanup);

describe('ActionPanel', () => {
  it('renders correctly', () => {
    const onDelete = jest.fn();
    const { getByText } = render(
      <ActionPanel gridId={'id'} onDelete={onDelete} />,
    );

    fireEvent.click(getByText(/delete/i));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
