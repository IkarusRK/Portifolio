import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { ThemeId, Mode } from '../types';

const STORAGE_THEME = 'portfolio-theme';
const STORAGE_MODE = 'portfolio-mode';

type ThemeContextValue = {
  theme: ThemeId;
  mode: Mode;
  setTheme: (theme: ThemeId) => void;
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const getStoredTheme = (): ThemeId => {
  if (typeof window === 'undefined') return 'purple';
  const v = localStorage.getItem(STORAGE_THEME);
  if (v === 'cyberpunk' || v === 'ocean' || v === 'sunset' || v === 'rosegold' || v === 'purple') return v;
  return 'purple';
};

const getStoredMode = (): Mode => {
  if (typeof window === 'undefined') return 'dark';
  const v = localStorage.getItem(STORAGE_MODE);
  if (v === 'light' || v === 'dark') return v;
  return 'dark';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeId>(getStoredTheme);
  const [mode, setModeState] = useState<Mode>(getStoredMode);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
    localStorage.setItem(STORAGE_THEME, theme);
    localStorage.setItem(STORAGE_MODE, mode);
  }, [theme, mode]);

  const setTheme = useCallback((t: ThemeId) => setThemeState(t), []);
  const toggleMode = useCallback(() => setModeState((m) => (m === 'dark' ? 'light' : 'dark')), []);

  return (
    <ThemeContext.Provider value={{ theme, mode, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
