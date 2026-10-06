import { useRef, useState, type MouseEvent } from 'react';
import { useLang, useOverlay } from '../context';
import { contact, contactSection, whatsappLink } from '../data/content';
import { Arrow, Instagram, Mail, Signature, Sparkle, WhatsApp } from './Icons';
import './Contact.css';

interface Imprint { id: number; x: number; y: number; r: number; s: number }

export function Contact() {
  const { t } = useLang();
  const { showToast } = useOverlay();
  const [imprints, setImprints] = useState<Imprint[]>([]);
  const areaRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLButtonElement>(null);

  const copyEmail = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contact.email);
      showToast(t(contactSection.copied));
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  // click the big stamp: it presses down and leaves an imprint somewhere around it
  const stamp = () => {
    const btn = stampRef.current;
    btn?.classList.remove('is-pressed');
    void btn?.offsetWidth;
    btn?.classList.add('is-pressed');
    const area = areaRef.current;
    if (!area) return;
    const w = area.clientWidth, h = area.clientHeight;
    const id = Date.now();
    setImprints((list) => [
      ...list.slice(-7),
      { id, x: 10 + Math.random() * (w - 120), y: 10 + Math.random() * (h - 180), r: -18 + Math.random() * 36, s: 0.45 + Math.random() * 0.35 },
    ]);
  };

  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow" data-reveal><Sparkle /> {t(contactSection.label)}</p>
          <h2 className="section-title contact__headline" id="contact-title" data-reveal style={{ ['--d' as string]: '.06s' }}>
            {t(contactSection.headline)}
          </h2>

          <dl className="contact__list">
            <div data-reveal style={{ ['--d' as string]: '.12s' }}>
              <dt>{t(contactSection.phone)}</dt>
              <dd>
                <a className="contact__value" href={whatsappLink(t(contact.whatsappMessage))} target="_blank" rel="noopener noreferrer">
                  {contact.phoneDisplay}
                  <WhatsApp />
                </a>
              </dd>
            </div>
            <div data-reveal style={{ ['--d' as string]: '.18s' }}>
              <dt>{t(contactSection.email)}</dt>
              <dd>
                <a className="contact__value" href={`mailto:${contact.email}`} onClick={copyEmail} data-tip={t(contactSection.copyHint)}>
                  {contact.email}
                  <Mail />
                </a>
              </dd>
            </div>
          </dl>

          <div className="contact__actions" data-reveal style={{ ['--d' as string]: '.24s' }}>
            <a className="btn contact__cta" href={whatsappLink(t(contact.whatsappMessage))} target="_blank" rel="noopener noreferrer">
              {t(contactSection.cta)} <Arrow dir="upright" />
            </a>
            <a className="contact__icon" href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            <a className="contact__icon" href={`mailto:${contact.email}`} aria-label="E-mail"><Mail /></a>
          </div>
        </div>

        <div className="contact__stamp-area" ref={areaRef}>
          {imprints.map((im) => (
            <Signature
              key={im.id}
              className="contact__imprint"
              aria-hidden="true"
              style={{ left: im.x, top: im.y, ['--r' as string]: `${im.r}deg`, ['--s' as string]: im.s }}
            />
          ))}
          <button type="button" className="contact__stamp" ref={stampRef} onClick={stamp} aria-label={t(contactSection.stampHint)}>
            <Signature />
            <span className="contact__stamp-hint" aria-hidden="true"><Sparkle /> {t(contactSection.stampHint)}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>Copyright ANARTE — {new Date().getFullYear()} · {t(contactSection.rights)}</p>
        <p className="footer__art">{t(contactSection.artRights)}</p>
        <a className="footer__top" href="#topo">
          {t(contactSection.top)} <Arrow dir="up" />
        </a>
      </div>
    </footer>
  );
}
