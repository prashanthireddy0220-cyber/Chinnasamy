import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'neural' | 'matrix' | 'times';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ALL_THEMES: Theme[] = ['dark', 'light', 'neural', 'matrix', 'times'];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && ALL_THEMES.includes(savedTheme)) {
      return savedTheme;
    }
    // First visit defaults to Dark mode as requested.
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Set data-theme attribute
    root.setAttribute('data-theme', theme);

    // Clean up existing theme-* classes
    ALL_THEMES.forEach((t) => root.classList.remove(`theme-${t}`));
    root.classList.add(`theme-${theme}`);

    // Set dark/light Tailwind base classes
    if (theme === 'light' || theme === 'times') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const currentIndex = ALL_THEMES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % ALL_THEMES.length;
      return ALL_THEMES[nextIndex];
    });
  };

  const setTheme = (newTheme: Theme) => {
    if (ALL_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
