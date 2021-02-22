import React, { createContext, useCallback, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

const ThemeContext = createContext({});

function MyThemeProvider({ children }) {
  const themeStoraged = localStorage.getItem('Vidula:theme');

  const [darkTheme, setDarkTheme] = useState(
    !!(!themeStoraged || themeStoraged === 'dark')
  );

  const changeTheme = useCallback(() => {
    localStorage.setItem('Vidula:theme', darkTheme ? 'light' : 'dark');
    setDarkTheme(darkT => !darkT);
  }, [darkTheme]);

  const theme = darkTheme ? dark : light;

  return (
    <ThemeProvider theme={theme.colors}>
      <ThemeContext.Provider
        value={{ changeTheme, theme: theme.colors, titleTheme: theme.title }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}

export { useTheme, MyThemeProvider };
