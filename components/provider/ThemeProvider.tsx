'use client';
//react modules
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  //Resolve initial theme (localStorage → system fallback)
  useEffect(() => {
    const stored = localStorage.getItem('theme');

    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      setTheme(getSystemTheme());
    }
  }, []);

  //Apply theme to dom
  useEffect(() => {
    if (!theme) return;

    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  //Listen for system theme changes
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = () => {
      const stored = localStorage.getItem('theme');

      if (stored !== 'light' && stored !== 'dark') {
        setTheme(media.matches ? 'dark' : 'light');
      }
    };

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  //Update theme manually
  const updateTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem('theme', t);
  };

  if (!theme) return null; // Render nothing until theme is resolved

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
