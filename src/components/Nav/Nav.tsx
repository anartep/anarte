import { useEffect, useState } from 'react';
import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import './Nav.css';

export function Nav() {
  const { lang, toggle, t } = useLang();
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
      <button
        className="nav__toggle"
        type="button"
        onClick={toggle}
        aria-label="Toggle language"
      >
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>
    </nav>
  );
}
