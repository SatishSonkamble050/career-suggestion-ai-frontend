/**
 * Authentication Service - Handles user registration, login, and session management
 */

import { api, ApiError } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
//   access_token: string;
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
    user_id: string | number;
    email: string;
    name: string;
    access_token: string;
}

export interface User {
  user_id?: string | number;
  id?: string | number;
  email: string;
  name?: string;
  created_at?: string;
}

/**
 * Register a new user
 */
export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  return api.post<AuthResponse>('/v1/auth/register', data);
}

/**
 * Login user and store token
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/v1/auth/login', data);

  // Store token and user info
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response));
    // setUser(response.user);
  }

  return response;
}

/**
 * Logout user and clear token
 */
export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

/**
 * Get current user from API
 */
export async function fetchCurrentUser(): Promise<User> {
  return api.get<User>('/users/me');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}
