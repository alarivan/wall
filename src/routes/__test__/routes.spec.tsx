import React from 'react';
import { render } from '@testing-library/react';
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import App from '../../App';

function renderWithRouter(
  ui: JSX.Element,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}

describe('Routes', () => {
  test('full app rendering/navigating', async () => {
    const {
      container,
      history: { navigate },
    } = renderWithRouter(<App />);
    const appContainer = container;
    expect(appContainer.innerHTML).toMatch('Home');

    await navigate('/editor');
    expect(container.innerHTML).toMatch('Rows');
  });

  test('landing on a bad page', () => {
    const { container } = renderWithRouter(<App />, {
      route: '/something-that-does-not-match',
    });
    expect(container.innerHTML).toMatch('404');
  });
});
