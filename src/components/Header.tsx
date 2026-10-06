import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLang, useOverlay, useTheme } from '../context';
import { contact, nav, ui, whatsappLink } from '../data/content';
import { useFocusTrap, useLockScroll } from '../hooks';
import { Behance, Close, Instagram, LinkedIn, Mail, Moon, Question, Signature, Sparkle, Sun, WhatsApp } from './Icons';
import './Header.css';

export function SocialRow({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const items = [
    { href: contact.instagram, label: 'Instagram', Icon: Instagram },
    { href: `mailto:${contact.email}`, label: 'E-mail', Icon: Mail },
    { href: whatsappLink(t(contact.whatsappMessage)), label: 'WhatsApp', Icon: WhatsApp },
    { href: contact.linkedin, label: 'LinkedIn', Icon: LinkedIn },
    { href: contact.behance, label: 'Behance', Icon: Behance },
  ];
  return (
    <ul className={`social ${className}`}>
      {items.map(({ href, label, Icon }, i) => (
        <li key={label} style={{ ['--i' as string]: i }}>
          <a
            className="social__link"
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            data-tip={label}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang" role="group" aria-label={t(ui.language)}>
      <span className="lang__knob" data-lang={lang} aria-hidden="true" />
      {(['pt', 'en'] as const).map((l) => (
        <button key={l} type="button" className="lang__btn" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useLang();
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onClick}
      aria-label={theme === 'day' ? t(ui.themeToDark) : t(ui.themeToLight)}
      data-theme-state={theme}
    >
      <Sun className="theme-toggle__sun" />
      <Moon className="theme-toggle__moon" />
    </button>
  );
}

function FaqLink({ compact = false }: { compact?: boolean }) {
  const { setFaqOpen } = useOverlay();
  const { t } = useLang();
  return (
    <button type="button" className={`faq-link ${compact ? 'faq-link--compact' : ''}`} onClick={() => setFaqOpen(true)}>
      <Question />
      <span>{t(ui.faq)}</span>
    </button>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLang();
  return (
    <>
      {nav.map((n) => (
        <li key={n.id}>
          <a className="nav-link" href={`#${n.id}`} onClick={onNavigate}>
            <Sparkle className="nav-link__star" />
            <span>{t(n.label)}</span>
          </a>
        </li>
      ))}
    </>
  );
}

export function Masthead() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const stampRef = useRef<HTMLAnchorElement>(null);

  const press = () => {
    const el = stampRef.current;
    if (!el) return;
    el.classList.remove('is-pressed');
    void el.offsetWidth;
    el.classList.add('is-pressed');
  };

  return (
    <header className="masthead" id="topo">
      <div className="masthead__bar container">
        <nav className="masthead__nav" aria-label="Principal">
          <ul><NavLinks /></ul>
        </nav>
        <button type="button" className="menu-btn" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-menu">
          <span className="menu-btn__lines" aria-hidden="true"><i /><i /></span>
          <span>{t(ui.menu)}</span>
        </button>
        <SocialRow className="masthead__social" />
        <div className="masthead__tools">
          <FaqLink />
          <LangToggle />
          <ThemeToggle />
          <a className="btn quote-btn masthead__quote masthead__quote--bar" href="#contato">{t(ui.quote)}</a>
        </div>
      </div>

      <div className="masthead__main container">
        <a href="#topo" className="stamp" ref={stampRef} onMouseEnter={press} onClick={press} aria-label="Anarte — início">
          <Signature className="stamp__svg" title="Anarte" />
          <Sparkle className="stamp__spark stamp__spark--a" />
          <Sparkle className="stamp__spark stamp__spark--b" />
        </a>
        <div className="masthead__intro">
          <p className="masthead__tagline">{t(ui.tagline)}</p>
          <p className="masthead__status"><span className="dot" aria-hidden="true" />{t(ui.available)}</p>
          <a className="btn quote-btn masthead__quote masthead__quote--intro" href="#contato">{t(ui.quoteLong)} <Sparkle /></a>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  useLockScroll(open);
  useFocusTrap(ref, open, onClose);
  return (
    <div className={`mobile-menu ${open ? 'is-open' : ''}`} id="mobile-menu" ref={ref} aria-hidden={!open} role="dialog" aria-modal="true" aria-label={t(ui.menu)}>
      <div className="mobile-menu__top">
        <Signature className="mobile-menu__logo" />
        <button type="button" className="icon-btn mobile-menu__close" onClick={onClose} aria-label={t(ui.close)} tabIndex={open ? 0 : -1}>
          <Close />
        </button>
      </div>
      <ul className="mobile-menu__links">
        <NavLinks onNavigate={onClose} />
      </ul>
      <div className="mobile-menu__foot">
        <SocialRow />
        <div className="mobile-menu__tools"><LangToggle /><ThemeToggle /></div>
      </div>
    </div>
  );
}

export function StickyNav() {
  const { t, lang } = useLang();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const m = document.querySelector('.masthead');
      const h = m ? m.getBoundingClientRect().bottom : 300;
      setShow(h < 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const secs = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [lang]);

  return (
    <div className={`sticky-nav ${show ? 'is-visible' : ''}`} aria-hidden={!show}>
      <div className="sticky-nav__inner container">
        <a href="#topo" className="sticky-nav__logo" aria-label="Anarte — topo" tabIndex={show ? 0 : -1}>
          <Signature />
        </a>
        <nav aria-label="Seções">
          <ul className="sticky-nav__links">
            {nav.map((n) => (
              <li key={n.id}>
                <a className={`nav-link ${active === n.id ? 'is-active' : ''}`} href={`#${n.id}`} tabIndex={show ? 0 : -1}>
                  <Sparkle className="nav-link__star" />
                  <span>{t(n.label)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sticky-nav__tools">
          <FaqLink compact />
          <LangToggle />
          <ThemeToggle />
          <a className="btn quote-btn sticky-nav__cta" href="#contato" tabIndex={show ? 0 : -1}>{t(ui.quote)}</a>
        </div>
      </div>
    </div>
  );
}
