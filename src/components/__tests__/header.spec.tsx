import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from '../Header';

afterEach(cleanup);

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);
  });
});
