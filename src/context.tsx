import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Lang, T } from './data/i18n-types';

/* ---------------- language ---------------- */

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <V = string>(field: T<V> | V) => V;
}

const LanguageContext = createContext<LangCtx | null>(null);

const read = (k: string) => {
  try { return localStorage.getItem(k); } catch { return null; }
};
const write = (k: string, v: string) => {
  try { localStorage.setItem(k, v); } catch { /* storage blocked */ }
};

function initialLang(): Lang {
  const stored = read('anarte-lang');
  if (stored === 'pt' || stored === 'en') return stored;
  return 'pt';
}

const isT = <V,>(x: unknown): x is T<V> =>
  typeof x === 'object' && x !== null && 'pt' in (x as object) && 'en' in (x as object);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write('anarte-lang', l);
  }, []);

  const t = useCallback(<V,>(field: T<V> | V): V => (isT<V>(field) ? field[lang] : field), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}

/* ---------------- theme ---------------- */

export type Theme = 'day' | 'night';

interface ThemeCtx {
  theme: Theme;
  toggle: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

function initialTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === 'day' || attr === 'night') return attr;
  return 'day';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'day' ? '#a95af8' : '#120a20');
  }, [theme]);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = theme === 'day' ? 'night' : 'day';
    write('anarte-theme', next);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 40;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = doc.startViewTransition(() => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    });
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
  }, [theme]);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

/* ---------------- overlays (FAQ + projects) ---------------- */

interface OverlayCtx {
  projectsOpen: boolean;
  projectSlug: string | null;
  projectFilter: string;
  openProjects: (opts?: { slug?: string | null; filter?: string }) => void;
  closeProjects: () => void;
  setProjectSlug: (slug: string | null) => void;
  setProjectFilter: (f: string) => void;
  faqOpen: boolean;
  setFaqOpen: (v: boolean) => void;
  toast: string | null;
  showToast: (msg: string) => void;
}

const OverlayContext = createContext<OverlayCtx | null>(null);

function parseHash() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (h === 'projetos') return { open: true, slug: null as string | null };
  if (h.startsWith('projetos/')) return { open: true, slug: h.slice(9) || null };
  return { open: false, slug: null as string | null };
}

export function OverlayProvider({ children }: { children: ReactNode }) {
  const initial = parseHash();
  const [projectsOpen, setProjectsOpen] = useState(initial.open);
  const [projectSlug, setSlug] = useState<string | null>(initial.slug);
  const [projectFilter, setProjectFilter] = useState('all');
  const [faqOpen, setFaqOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // keep URL hash in sync so the browser back button closes the panel / project
  useEffect(() => {
    const onHash = () => {
      const p = parseHash();
      setProjectsOpen(p.open);
      setSlug(p.slug);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const pushHash = (h: string) => {
    if (location.hash.replace(/^#/, '') !== h) history.pushState(null, '', h ? `#${h}` : location.pathname + location.search);
  };

  const openProjects = useCallback((opts?: { slug?: string | null; filter?: string }) => {
    const slug = opts?.slug ?? null;
    if (opts?.filter) setProjectFilter(opts.filter);
    setProjectsOpen(true);
    setSlug(slug);
    pushHash(slug ? `projetos/${slug}` : 'projetos');
  }, []);

  const closeProjects = useCallback(() => {
    setProjectsOpen(false);
    setSlug(null);
    pushHash('');
  }, []);

  const setProjectSlug = useCallback((slug: string | null) => {
    setSlug(slug);
    pushHash(slug ? `projetos/${slug}` : 'projetos');
  }, []);

  const toastTimer = useRef<number | undefined>(undefined);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const value = useMemo(
    () => ({ projectsOpen, projectSlug, projectFilter, openProjects, closeProjects, setProjectSlug, setProjectFilter, faqOpen, setFaqOpen, toast, showToast }),
    [projectsOpen, projectSlug, projectFilter, openProjects, closeProjects, setProjectSlug, faqOpen, toast, showToast],
  );
  return <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>;
}

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlay must be used inside OverlayProvider');
  return ctx;
}
