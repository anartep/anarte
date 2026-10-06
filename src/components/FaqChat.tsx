import { useEffect, useRef, useState } from 'react';
import { useLang, useOverlay } from '../context';
import { contact, faq, ui, whatsappLink } from '../data/content';
import type { T } from '../data/i18n-types';
import { useFocusTrap, useLockScroll, useReducedMotion } from '../hooks';
import { Close, Mail, Question, Sparkle, WhatsApp } from './Icons';
import portrait from '../assets/about/portrait.webp';
import './FaqChat.css';

interface Msg { id: number; from: 'ana' | 'me'; text: T; kind?: 'cta' }

let uid = 0;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** FAQ as a little chat with Ana: tap a question, she "types" the answer. */
export function FaqChat() {
  const { t } = useLang();
  const { faqOpen, setFaqOpen, projectsOpen } = useOverlay();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const started = useRef(false);
  const ctaShown = useRef(false);
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches;

  useLockScroll(faqOpen && mobile);
  useFocusTrap(ref, faqOpen, () => setFaqOpen(false));

  const say = async (texts: T[], kind?: Msg['kind']) => {
    for (const text of texts) {
      setTyping(true);
      await wait(reduced ? 80 : Math.min(1400, 450 + t(text).length * 9));
      setTyping(false);
      setMsgs((m) => [...m, { id: ++uid, from: 'ana', text, kind }]);
      await wait(reduced ? 20 : 160);
    }
  };

  useEffect(() => {
    if (!faqOpen || started.current) return;
    started.current = true;
    setBusy(true);
    (async () => { await wait(250); await say(faq.hello); setBusy(false); })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqOpen]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [msgs, typing, reduced]);

  const ask = async (i: number) => {
    if (busy) return;
    setBusy(true);
    setAsked((a) => [...a, i]);
    setMsgs((m) => [...m, { id: ++uid, from: 'me', text: faq.items[i].q }]);
    await wait(300);
    await say(faq.items[i].a);
    if (asked.length + 1 >= 2 && !ctaShown.current) { ctaShown.current = true; await say([faq.done], 'cta'); }
    setBusy(false);
  };

  const restart = () => {
    setMsgs([]); setAsked([]); ctaShown.current = false; setBusy(true);
    (async () => { await say(faq.hello); setBusy(false); })();
  };

  const remaining = faq.items.map((q, i) => ({ q, i })).filter(({ i }) => !asked.includes(i));
  const wa = whatsappLink(t(contact.whatsappMessage));

  return (
    <>
      <button
        type="button"
        className={`faq-fab ${faqOpen || projectsOpen ? 'is-hidden' : ''}`}
        onClick={() => setFaqOpen(true)}
        aria-label={t(ui.faqLong)}
        aria-expanded={faqOpen}
      >
        <Question />
        <span className="faq-fab__label">{t(ui.faqLong)}</span>
        <Sparkle className="faq-fab__spark" />
      </button>

      <div className={`chat-root ${faqOpen ? 'is-open' : ''}`} aria-hidden={!faqOpen}>
        <div className="chat-scrim" onClick={() => setFaqOpen(false)} />
        <div className="chat" ref={ref} role="dialog" aria-modal="true" aria-labelledby="chat-title">
          <header className="chat__head">
            <img className="chat__avatar" src={portrait} alt="" width={48} height={48} />
            <div className="chat__who">
              <p className="chat__name" id="chat-title">Ana · {t(faq.title)}</p>
              <p className="chat__status"><span className="dot" aria-hidden="true" /> {t(faq.status)}</p>
            </div>
            <button type="button" className="chat__close" onClick={() => setFaqOpen(false)} aria-label={t(ui.close)} tabIndex={faqOpen ? 0 : -1}>
              <Close />
            </button>
          </header>

          <div className="chat__list" ref={listRef} aria-live="polite">
            {msgs.map((m) => (
              <div key={m.id} className={`bubble bubble--${m.from} ${m.kind === 'cta' ? 'bubble--cta' : ''}`}>
                <p>{t(m.text)}</p>
                {m.kind === 'cta' && (
                  <div className="bubble__actions">
                    <a className="bubble__btn" href={wa} target="_blank" rel="noopener noreferrer" tabIndex={faqOpen ? 0 : -1}><WhatsApp /> WhatsApp</a>
                    <a className="bubble__btn" href={`mailto:${contact.email}`} tabIndex={faqOpen ? 0 : -1}><Mail /> E-mail</a>
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="bubble bubble--ana bubble--typing" aria-label={t(faq.typing)}>
                <i /><i /><i />
              </div>
            )}
          </div>

          <div className="chat__options">
            {msgs.length > 2 && remaining.length > 0 && <p className="chat__more">{t(faq.more)}</p>}
            <div className="chat__chips">
              {remaining.map(({ q, i }) => (
                <button key={i} type="button" className="qchip" onClick={() => ask(i)} disabled={busy} tabIndex={faqOpen ? 0 : -1}>
                  {t(q.q)}
                </button>
              ))}
              {remaining.length === 0 && (
                <button type="button" className="qchip qchip--ghost" onClick={restart} tabIndex={faqOpen ? 0 : -1}>↺ {t(faq.restart)}</button>
              )}
            </div>
            <a className="chat__wa" href={wa} target="_blank" rel="noopener noreferrer" tabIndex={faqOpen ? 0 : -1}>
              <WhatsApp /> {t({ pt: 'Falar direto com a Ana', en: 'Talk to Ana directly' })}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
