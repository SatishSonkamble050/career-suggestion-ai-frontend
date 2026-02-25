/**
 * API Service - Core HTTP client for all API calls
 * Handles authentication, error handling, and request/response formatting
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Get authorization headers with token if available
 */
function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Generic fetch function with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = `API Error: ${response.statusText}`;
    throw new ApiError(response.status, response.statusText, errorMessage);
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * API client object with CRUD methods
 */
export const api = {
  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return fetchAPI<T>(endpoint, {
      method: 'GET',
    });
  },

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return fetchAPI<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return fetchAPI<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return fetchAPI<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return fetchAPI<T>(endpoint, {
      method: 'DELETE',
    });
  },
};
