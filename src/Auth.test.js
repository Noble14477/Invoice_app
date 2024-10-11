import { render, screen, fireEvent, waitFor } from "@testing-library/react"; // Import waitFor
import React from 'react';
import { AppProvider } from "./context/AppContext.jsx";
import {
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import Login from "./pages/Auth/Login";
import { MemoryRouter } from "react-router-dom";

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

jest.mock("./firebaseConfig", () => ({
  auth: {}, // Ensure this matches what your component expects
}));

describe('Auth Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signs in user with correct credentials', async () => {
    // Mock Firebase sign-in response
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: '123', email: 'test@example.com' },
    });

    render(
      <MemoryRouter>
        <AppProvider>
          <Login />
        </AppProvider>
      </MemoryRouter>
    );

    // Simulate user input for login using labels
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText('Submit'));

    // Check if Firebase Auth is called with correct values
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // This is the auth object
        'test@example.com',
        'password'
      );
    });
  });
});
