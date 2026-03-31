import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang, T } from '../data/content';

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <V = string>(field: T<V>) => V;
  toggle: () => void;
}

const Ctx = createContext<LanguageCtx | null>(null);

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem('anarte-lang');
    if (stored === 'en' || stored === 'pt') return stored;
  } catch { /* SSR / blocked storage */ }
  return 'pt';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('anarte-lang', l); } catch { /* noop */ }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'pt' ? 'en' : 'pt');
  }, [lang, setLang]);

  const t = useCallback(<V,>(field: T<V>): V => field[lang], [lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, t, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
