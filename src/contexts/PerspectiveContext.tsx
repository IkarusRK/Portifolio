import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Perspective } from '../types';

const STORAGE_KEY = 'portfolio-perspective';

interface PerspectiveContextType {
  perspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  togglePerspective: () => void;
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  hasChosenInitially: boolean;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export const PerspectiveProvider = ({ children }: { children: ReactNode }) => {
  const [perspective, setPerspectiveState] = useState<Perspective>(() => {
    if (typeof window === 'undefined') return 'client';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dev' || saved === 'client') return saved;
    return 'client';
  });

  const [hasChosenInitially, setHasChosenInitially] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !!localStorage.getItem(STORAGE_KEY);
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(STORAGE_KEY);
  });

  const setPerspective = useCallback((newPerspective: Perspective) => {
    setPerspectiveState(newPerspective);
    setHasChosenInitially(true);
    setIsOnboardingOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newPerspective);
    }
  }, []);

  const togglePerspective = useCallback(() => {
    setPerspectiveState((prev) => {
      const next = prev === 'client' ? 'dev' : 'client';
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const openOnboarding = useCallback(() => {
    setIsOnboardingOpen(true);
  }, []);

  const closeOnboarding = useCallback(() => {
    setIsOnboardingOpen(false);
    setHasChosenInitially(true);
    if (typeof window !== 'undefined' && !localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, perspective);
    }
  }, [perspective]);

  return (
    <PerspectiveContext.Provider
      value={{
        perspective,
        setPerspective,
        togglePerspective,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        hasChosenInitially,
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  );
};

export const usePerspective = () => {
  const context = useContext(PerspectiveContext);
  if (!context) {
    throw new Error('usePerspective must be used within a PerspectiveProvider');
  }
  return context;
};
