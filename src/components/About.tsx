import { useEffect, useRef } from 'react';
import { useLang } from '../context';
import { about, contact } from '../data/content';
import { usePointerParallax, useReducedMotion } from '../hooks';
import { SocialRow } from './Header';
import { Arrow, Sparkle } from './Icons';
import { WaveText } from './WaveText';
import portrait from '../assets/about/portrait.webp';
import './About.css';

export function Wave({ className = '' }: { className?: string }) {
  // seamless tile: the path repeats every 720 units, the svg is 1440 wide and slides by half
  const d = 'M0 60 C 120 10, 240 10, 360 50 S 600 110, 720 60 S 960 10, 1080 50 S 1320 110, 1440 60 V 140 H 0 Z';
  return (
    <div className={`wave ${className}`} aria-hidden="true">
      <svg className="wave__back" viewBox="0 0 1440 140" preserveAspectRatio="none"><path d={d} /></svg>
      <svg className="wave__front" viewBox="0 0 1440 140" preserveAspectRatio="none"><path d={d} /></svg>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const fig = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  usePointerParallax(fig, !reduced);
  const ring = t(about.ring).repeat(2);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ringRef.current;
    const host = fig.current;
    if (!el || !host || reduced) return;
    let target = 1, rate = 1, raf = 0;
    const tick = () => {
      rate += (target - rate) * 0.06;
      el.getAnimations().forEach((a) => { a.playbackRate = rate; });
      if (Math.abs(target - rate) > 0.005) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const go = (v: number) => { target = v; if (!raf) raf = requestAnimationFrame(tick); };
    const enter = () => go(3.2);
    const leave = () => go(1);
    host.addEventListener('pointerenter', enter);
    host.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); host.removeEventListener('pointerenter', enter); host.removeEventListener('pointerleave', leave); };
  }, [reduced]);

  return (
    <section className="about" id="sobre" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__text">
          <p className="eyebrow" data-reveal><Sparkle /> {t(about.label)}</p>
          <h2 className="section-title about__name wave-title" id="about-title" aria-label={contact.name} data-reveal style={{ ['--d' as string]: '.08s' }}>
            <WaveText text={contact.name} />
          </h2>
          <p className="about__role" data-reveal style={{ ['--d' as string]: '.14s' }}>{t(about.role)}</p>
          <div className="about__bio">
            {about.bio.map((p, i) => (
              <p key={i} data-reveal style={{ ['--d' as string]: `${0.2 + i * 0.08}s` }}>{t(p)}</p>
            ))}
          </div>
          <div className="about__actions" data-reveal style={{ ['--d' as string]: '.36s' }}>
            <a className="btn" href="#contato">{t(about.ctaContact)} <Sparkle /></a>
            <a className="btn btn--ghost" href="#trabalhos">{t(about.ctaWorks)} <Arrow dir="down" /></a>
          </div>
          <div data-reveal style={{ ['--d' as string]: '.44s' }}><SocialRow className="about__social" /></div>
        </div>

        <figure className="about__figure" ref={fig} data-reveal>
          <div className="about__tilt">
            <svg className="about__ring" ref={ringRef} viewBox="0 0 400 400" aria-hidden="true">
              <defs>
                <path id="ring-path" d="M200 200 m-178 0 a178 178 0 1 1 356 0 a178 178 0 1 1 -356 0" />
              </defs>
              <text><textPath href="#ring-path" textLength="1112" lengthAdjust="spacing">{ring}</textPath></text>
            </svg>
            <div className="about__disc">
              <img src={portrait} alt={t(about.portraitAlt)} loading="lazy" decoding="async" width={765} height={800} />
            </div>
            <Sparkle className="about__orb about__orb--1" />
            <Sparkle className="about__orb about__orb--2" />
            <Sparkle className="about__orb about__orb--3" />
          </div>
        </figure>
      </div>
      <Wave />
    </section>
  );
}
