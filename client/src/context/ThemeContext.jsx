import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('glamora_theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  const toggle = () => {
    setDark(d => {
      const next = !d;
      localStorage.setItem('glamora_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
  }, [dark]);

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
