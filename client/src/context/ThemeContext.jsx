import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('glamora_theme');
    // Default dark if no preference saved
    return saved ? saved === 'dark' : true;
  });

  const toggle = () => setDark(d => {
    const next = !d;
    localStorage.setItem('glamora_theme', next ? 'dark' : 'light');
    return next;
  });

  useEffect(() => {
    // Apply to both html and body so all CSS selectors work
    const root = document.documentElement;
    const body = document.body;
    if (dark) {
      root.classList.remove('light');
      body.classList.remove('light');
    } else {
      root.classList.add('light');
      body.classList.add('light');
    }
    // Also update theme-color meta for mobile browser chrome
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? '#060504' : '#faf6f1';
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
