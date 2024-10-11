import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from 'react';
import { AppProvider } from "./context/AppContext.jsx";
import {
  createUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import { MemoryRouter } from "react-router-dom";
import Register from "./pages/Auth/Register.jsx";


jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

jest.mock("./firebaseConfig", () => ({
  auth: {}, // Ensure this matches what your component expects
}));

describe('Auth Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signs up user with correct credentials', async () => {
    // Mock Firebase signup response
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com' },
    });

    render(
      <MemoryRouter>
        <AppProvider>
          <Register />
        </AppProvider>
      </MemoryRouter>
    );

    // Simulate user input for registration
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText('Submit'));

    // Check if Firebase Auth is called with correct values
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // This is the auth object
        'test@example.com',
        'password'
      );
    });
  });
});
