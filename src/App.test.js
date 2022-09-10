import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Home Page Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Face to Name Trivia/i);
  expect(linkElement).toBeInTheDocument();
});
