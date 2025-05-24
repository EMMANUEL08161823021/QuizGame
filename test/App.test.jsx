import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  test('renders quiz title', () => {
    render(<App />);
    expect(screen.getByText(/Quiz Game/i)).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
});