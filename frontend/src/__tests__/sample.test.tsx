import { render, screen } from '@testing-library/react';

test('sample', () => {
  render(<div>Hello</div>);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
