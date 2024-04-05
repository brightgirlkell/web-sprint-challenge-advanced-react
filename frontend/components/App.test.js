import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';

test('initial state is set correctly', () => {
  const { getByText } = render(<AppFunctional />);
  expect(getByText('You moved 0 times')).toBeInTheDocument();
});

test('moving the "B" character within the grid', () => {
  const { getByText, getByTestId } = render(<AppFunctional />);
  userEvent.click(getByTestId('up'));
  expect(getByText('Coordinates (2, 1)')).toBeInTheDocument();
});

test('resetting the grid', () => {
  const { getByTestId, getByText } = render(<AppFunctional />);
  userEvent.click(getByTestId('up'));
  userEvent.click(getByTestId('reset'));
  expect(getByText('Coordinates (2, 2)')).toBeInTheDocument();
});

test('submitting the form successfully', async () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(<AppFunctional />);
  userEvent.type(getByPlaceholderText('type email'), 'lady@gaga.com');
  userEvent.click(getByTestId('submit'));
  await waitFor(() => {
    expect(getByText('Data submitted successfully')).toBeInTheDocument();
  });
});

test('error handling when submitting the form', async () => {
  const { getByTestId, getByPlaceholderText, getByText } = render(<AppFunctional />);
  userEvent.type(getByPlaceholderText('type email'), 'invalidemail');
  userEvent.click(getByTestId('submit'));
  await waitFor(() => {
    expect(getByText('Error: Failed to submit data')).toBeInTheDocument();
  });
});
// Write your tests here

