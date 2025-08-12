
import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { translations } from '../constants';
import { Translation } from '../types';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}

const defaultState: LanguageContextType = {
  language: 'es',
  setLanguage: () => {},
  t: translations.es,
};

export const LanguageContext = createContext<LanguageContextType>(defaultState);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'es') ? savedLang : 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
