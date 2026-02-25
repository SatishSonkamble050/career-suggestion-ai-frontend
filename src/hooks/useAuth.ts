/**
 * useAuth Hook - Authentication management hook
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  fetchCurrentUser,
  isAuthenticated,
  User,
  LoginRequest,
  RegisterRequest,
} from '@/services/auth';
import { useApi } from './useApi';
import { set } from 'react-hook-form';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: LoginRequest | any) => Promise<void | any>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Expose setUser for manual updates if needed
  initialLoading: boolean; // Expose initial loading state to handle loading UI on app start
}

/**
 * Hook for authentication management
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true); // Track initial loading state
  const { call } = useApi();

  // Check if already authenticated on mount
  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser && isAuthenticated()) {
      setUser(storedUser);
      setInitialLoading(false);
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const  user  = await loginUser(credentials);
        console.log('User logged in:', user);
        setUser({ id: user.user_id, email: user.email, name: user.name });
        setIsLoading(false);
        console.log('User logged in:', user);
        return user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const  user  = await registerUser(data);
        setUser({ id: user.user_id, email: user.email, name: user.name });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
    setError(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const updatedUser = await fetchCurrentUser();
      setUser(updatedUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to refresh user';
      setError(message);
    }
  }, [call]);

  return {
    user,
    isLoading,
    isAuthenticated: user !== null,
    error,
    login,
    register,
    logout,
    refreshUser,
    setUser, // Expose setUser for manual updates if needed
    initialLoading, // Expose initial loading state to handle loading UI on app start
  };
}
