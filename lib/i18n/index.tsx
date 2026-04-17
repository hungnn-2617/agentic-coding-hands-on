'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Locale, TranslationKey, TranslationParams } from '@/lib/i18n/types';
import { vi as viTranslations } from '@/lib/i18n/locales/vi';
import { en as enTranslations } from '@/lib/i18n/locales/en';

const translations = { vi: viTranslations, en: enTranslations } as const;

interface LanguageContextValue {
  locale: Locale;
  t: (key: TranslationKey, params?: TranslationParams) => string;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readLocaleCookie(): Locale {
  if (typeof document === 'undefined') return 'vi';
  const match = document.cookie.match(/(?:^|;\s*)locale=(\w+)/);
  const value = match?.[1];
  if (value === 'vi' || value === 'en') return value;
  return 'vi';
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `locale=${locale};path=/;max-age=31536000`;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocaleCookie);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    writeLocaleCookie(newLocale);
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: TranslationParams): string => {
      let value = translations[locale][key] ?? translations.vi[key] ?? key;
      if (params) {
        value = value.replace(/\{(\w+)\}/g, (_, k: string) =>
          params[k] !== undefined ? String(params[k]) : `{${k}}`,
        );
      }
      return value;
    },
    [locale],
  );

  const contextValue = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function HtmlLangUpdater() {
  const { locale } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
