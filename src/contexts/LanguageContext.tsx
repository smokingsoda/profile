import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  type Lang,
  translations,
  placeTranslations,
  timeTranslations,
} from '../i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  translatePlace: (place: string) => string;
  translateTime: (time: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem('language') as Lang) || 'zh',
  );

  // Sync body data-lang attribute (for CSS font switching)
  useEffect(() => {
    document.body.setAttribute('data-lang', lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('language', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => translations[lang][key] ?? key,
    [lang],
  );

  const translatePlace = useCallback(
    (place: string) => placeTranslations[lang][place] ?? place,
    [lang],
  );

  const translateTime = useCallback(
    (time: string) => timeTranslations[lang][time] ?? time,
    [lang],
  );

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLang, t, translatePlace, translateTime }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
