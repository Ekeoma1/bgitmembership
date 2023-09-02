import { createContext } from 'react';
import { useTheme } from '../hooks/useTheme';

export const AppContext = createContext({
  // theme: 'light',
  // toggleTheme: () => {},
});
export default function ContextProvider({ children }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <AppContext.Provider value={{ theme2: 'test', toggleTheme, theme }}>
      {children}
    </AppContext.Provider>
  );
}

