import { useEffect, useState } from 'react';
import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import './Nav.css';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function Nav() {
  const { lang, toggle: toggleLang, t } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      {content.nav.links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="nav__link"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(link.id);
          }}
        >
          {t(link.label)}
        </a>
      ))}

      <div className="nav__controls">
        <button
          className="nav__theme-btn"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          className="nav__toggle"
          type="button"
          onClick={toggleLang}
          aria-label="Toggle language"
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/flag-${lang === 'pt' ? 'us' : 'br'}.png`}
            alt={lang === 'pt' ? 'English' : 'Português'}
            className="nav__flag"
          />
        </button>
      </div>
    </nav>
  );
}
