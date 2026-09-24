import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS, type Language, type Translations } from './translations';

export interface LanguageInfo {
  code: Language;
  name: string;
  flag: string;
  short: string;
}

export const AVAILABLE_LANGUAGES: LanguageInfo[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷', short: 'PT' },
  { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', short: 'ES' },
  { code: 'zh', name: '简体中文', flag: '🇨🇳', short: 'ZH' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('eclipsa_language') as Language;
      if (saved && ['pt', 'en', 'es', 'zh'].includes(saved)) {
        return saved;
      }
      // Detect browser language
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('en')) return 'en';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('zh')) return 'zh';
      return 'pt';
    } catch {
      return 'pt';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('eclipsa_language', lang);
      document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : lang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language === 'zh' ? 'zh-CN' : language);
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language] || TRANSLATIONS.pt,
    languages: AVAILABLE_LANGUAGES,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
