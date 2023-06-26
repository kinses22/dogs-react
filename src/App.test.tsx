import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 6 images', async () => {
  render(<App />);
  const images = await screen.findAllByRole('img');
  const videos = await screen.findAllByRole('video');
  const elements = [...images, ...videos];
  expect(elements).toHaveLength(6);
});
