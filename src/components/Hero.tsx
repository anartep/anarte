import { useEffect, useRef } from 'react';
import { useLang } from '../context';
import { ui } from '../data/content';
import { usePointerParallax, useReducedMotion } from '../hooks';
import { Sparkle } from './Icons';
import { StarField } from './starfield';
import nebula from '../assets/hero/nebula.webp';
import nebulaSm from '../assets/hero/nebula-sm.webp';
import character from '../assets/hero/character.webp';
import characterSm from '../assets/hero/character-sm.webp';
import './Hero.css';

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fxRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  usePointerParallax(ref, !reduced);

  useEffect(() => {
    if (!canvasRef.current || !fxRef.current || !ref.current) return;
    const field = new StarField(canvasRef.current, fxRef.current, ref.current, reduced);
    return () => field.destroy();
  }, [reduced]);

  // scroll-linked depth (0 at top of hero -> 1 when it leaves)
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / r.height));
        el.style.setProperty('--sy', p.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
  }, [reduced]);

  return (
    <section className="hero" ref={ref} aria-label={t(ui.heroAlt)}>
      <div className="hero__layer hero__neb" aria-hidden="true">
        <img src={nebula} srcSet={`${nebulaSm} 1200w, ${nebula} 2400w`} sizes="100vw" alt="" fetchPriority="high" decoding="async" />
      </div>
      <canvas className="hero__stars" ref={canvasRef} aria-hidden="true" />
      <div className="hero__layer hero__char">
        <img
          src={character}
          srcSet={`${characterSm} 960w, ${character} 1821w`}
          sizes="(max-width: 700px) 160vw, 90vw"
          alt={t(ui.heroAlt)}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__layer hero__fg" aria-hidden="true">
        <Sparkle className="hero__big hero__big--1" />
        <Sparkle className="hero__big hero__big--2" />
        <Sparkle className="hero__big hero__big--3" />
        <Sparkle className="hero__big hero__big--4" />
        <Sparkle className="hero__big hero__big--5" />
      </div>
      <canvas className="hero__fx" ref={fxRef} aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />
      <p className="hero__hint" aria-hidden="true">{t(ui.starsHint)}</p>
      <p className="hero__caption"><Sparkle /> {t(ui.heroCaption)} — Ana Paula Silva</p>
      <a className="hero__scroll" href="#sobre" aria-label={t(ui.scroll)}>
        <span>{t(ui.scroll)}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
