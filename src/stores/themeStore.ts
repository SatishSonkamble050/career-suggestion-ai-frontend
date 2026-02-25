import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * Theme store for managing dark/light mode
 * Persists theme preference to localStorage
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system' as Theme,

      setTheme: (theme: Theme) => {
        set({ theme });

        // Apply theme to document
        if (theme === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', isDark);
        } else {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      },
    }),
    {
      name: 'theme-store',
      version: 1,
    }
  )
);
