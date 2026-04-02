import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

test('renders primary button and handles click', async () => {
  const clickFn = jest.fn();
  render(<Button onClick={clickFn} variant="primary" size="md">Test</Button>);

  const button = screen.getByRole('button', { name: 'Test' });
  expect(button).not.toBeNull();
  expect(button.className).toMatch(/btn-primary/);

  await userEvent.click(button);
  expect(clickFn).toHaveBeenCalledTimes(1);
});

test('disabled button is not clickable', async () => {
  const clickFn = jest.fn();
  render(<Button onClick={clickFn} disabled>Disabled</Button>);

  const button = screen.getByRole('button', { name: 'Disabled' });
  expect(button).not.toBeNull();
  expect(button).toHaveProperty('disabled', true);

  await userEvent.click(button);
  expect(clickFn).not.toHaveBeenCalled();
});
