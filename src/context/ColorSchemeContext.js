import React, { useState, createContext, useEffect } from 'react';
import { useColorScheme, Button } from 'react-native';

export const ColorSchemeContext = createContext();

export const ColorSchemeContextProvider = (props) => {
  const colorScheme = useColorScheme();
  const [scheme, setScheme] = useState(colorScheme);

  const toggleScheme = () => {
    setScheme(scheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setScheme(colorScheme);
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ scheme, toggleScheme }}>
      {props.children}
    </ColorSchemeContext.Provider>
  );
};
