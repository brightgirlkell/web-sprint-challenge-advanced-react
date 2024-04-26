// App.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Importing the jest-dom matcher
import axios from 'axios';

// Mocking the Axios module
jest.mock('axios', () => ({
  post: jest.fn((url, data) => Promise.resolve({ data })),
}));

import AppFunctional from './AppFunctional';

describe('AppFunctional', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Move left', () => {
    const { getByText } = render(<AppFunctional />);
    fireEvent.click(getByText('LEFT'));
    expect(getByText('You moved 1 time')).toBeInTheDocument();
  });

  test('Move up', () => {
    const { getByText } = render(<AppFunctional />);
    fireEvent.click(getByText('UP'));
    expect(getByText('You moved 1 time')).toBeInTheDocument();
  });

  test('Move right', () => {
    const { getByText } = render(<AppFunctional />);
    fireEvent.click(getByText('RIGHT'));
    expect(getByText('You moved 1 time')).toBeInTheDocument();
  });

  test('Move down', () => {
    const { getByText } = render(<AppFunctional />);
    fireEvent.click(getByText('DOWN'));
    expect(getByText('You moved 1 time')).toBeInTheDocument();
  });

  test('Submit form', async () => {
    const { getByPlaceholderText, getByText } = render(<AppFunctional />);
    const emailInput = getByPlaceholderText('type email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:9000/api/result', {
        x: 2,
        y: 2,
        steps: 0,
        email: 'test@example.com',
      });
    });
  });
  
});


// Write your tests here

