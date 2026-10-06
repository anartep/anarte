import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context';
import { publishers } from '../data/content';
import { PublisherMark, Sparkle } from './Icons';
import { WaveText } from './WaveText';
import './Publishers.css';

export function Publishers() {
  const { t } = useLang();
  const [flipped, setFlipped] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // tap/click anywhere outside the coins (or press Esc) turns the open coin back
  useEffect(() => {
    if (!flipped) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('.coin')) setFlipped(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFlipped(null); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [flipped]);

  return (
    <section className="publishers" id="editoras" aria-labelledby="pub-title">
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow" data-reveal><Sparkle /> {t(publishers.label)}</p>
          <h2 className="section-title wave-title" id="pub-title" aria-label={t(publishers.title)} data-reveal style={{ ['--d' as string]: '.06s' }}><WaveText text={t(publishers.title)} /></h2>
          <p className="sec-head__hint" data-reveal style={{ ['--d' as string]: '.12s' }}>{t(publishers.hint)}</p>
        </header>
        <ul className="coins" ref={listRef}>
          {publishers.items.map((p, i) => (
            <li key={p.id} data-reveal style={{ ['--d' as string]: `${0.1 + i * 0.07}s`, ['--i' as string]: i }}>
              <button
                type="button"
                className={`coin ${flipped === p.id ? 'is-flipped' : ''}`}
                aria-label={p.name}
                aria-pressed={flipped === p.id}
                onClick={() => setFlipped(flipped === p.id ? null : p.id)}
              >
                <span className="coin__inner">
                  <span className="coin__face coin__front">
                    <PublisherMark id={p.id} className={`coin__mark coin__mark--${p.id}`} />
                  </span>
                  <span className="coin__face coin__back">
                    <Sparkle className="coin__star" />
                    <span className="coin__name">{p.name}</span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
