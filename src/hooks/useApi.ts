/**
 * useApi Hook - Generic hook for making API calls with loading and error states
 */

'use client';

import { useState, useCallback } from 'react';
import { ApiError } from '@/services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  call: <R = T>(
    apiFunction: () => Promise<R>,
    onSuccess?: (data: R) => void,
    onError?: (error: Error) => void
  ) => Promise<R | null>;
  reset: () => void;
}

/**
 * Generic API hook for making async calls
 * @template T - The return type of the data
 * @returns Object with data, loading, error states and call function
 */
export function useApi<T = any>(): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const call = useCallback(
    async <R = T,>(
      apiFunction: () => Promise<R>,
      onSuccess?: (data: R) => void,
      onError?: (error: Error) => void
    ): Promise<R | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const result = await apiFunction();
        setState({ data: result as any, loading: false, error: null });
        onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        const errorMessage = error instanceof ApiError
          ? `${error.status}: ${error.message}`
          : error.message;
        
        setState({ data: null, loading: false, error: errorMessage });
        onError?.(error);
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, call, reset };
}

/**
 * Hook for POST requests
 */
export function usePost<T = any>() {
  return useApi<T>();
}

/**
 * Hook for GET requests
 */
export function useGet<T = any>() {
  return useApi<T>();
}
