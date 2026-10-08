import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, type TranslationDictionary } from '../data/translations';

const STORAGE_KEY = 'portfolio-lang';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'pt';
    const saved = localStorage.getItem(STORAGE_KEY) as Language;
    if (saved && TRANSLATIONS[saved]) return saved;

    // Auto-detect browser language if available
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('ru')) return 'ru';
    if (browserLang.startsWith('en')) return 'en';

    return 'pt';
  });

  const setLanguage = useCallback((newLang: Language) => {
    if (TRANSLATIONS[newLang]) {
      setLanguageState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLang);
        document.documentElement.lang = newLang;
      }
    }
  }, []);

  const t = TRANSLATIONS[language] ?? TRANSLATIONS.pt;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
