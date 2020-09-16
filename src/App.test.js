import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

import './matchMedia.mock';

test('renders <App /> without crashing', () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Carousel first buttons
  expect(getAllByText('1')).toHaveLength(2);
});
