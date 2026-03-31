'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SocialLinks } from '../shared/SocialLinks';
import './HeroSection.css';

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,0 L13.2,9.2 L24,12 L13.2,14.8 L12,24 L10.8,14.8 L0,12 L10.8,9.2 Z" />
    </svg>
  );
}

const FRONT_SPARKLES = [
  { x: '-8%', y: '15%', size: 22, delay: 0 },
  { x: '96%', y: '30%', size: 16, delay: 1.5 },
  { x: '100%', y: '70%', size: 26, delay: 3 },
  { x: '-6%', y: '80%', size: 14, delay: 0.8 },
  { x: '45%', y: '-8%', size: 18, delay: 2.2 },
];

export function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameAreaRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!frameAreaRef.current) return;
    const xF = (e.clientX / window.innerWidth - 0.5) * 2;
    const yF = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to(frameAreaRef.current.querySelector('.hero__aura'), {
      x: xF * 5, y: yF * 3, duration: 1.6, ease: 'power2.out', overwrite: 'auto',
    });

    const charImg = frameAreaRef.current.querySelector('.hero__character-img');
    if (charImg) {
      gsap.to(charImg, {
        x: `${-50 + xF * 1.2}%`, y: yF * 6, duration: 1.2, ease: 'power2.out', overwrite: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

      tl.fromTo('.hero__aura', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.5 })
        .fromTo('.hero__frame', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1 }, '-=1')
        .fromTo('.hero__character-img', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
        .fromTo('.hero__text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.5')
        .fromTo('.hero__label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .fromTo('.hero__title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero__divider', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: 'left' }, '-=0.5')
        .fromTo('.hero__subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('.hero__micro', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .fromTo('.hero__actions', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero__social', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
        .add(() => {
          frameAreaRef.current?.classList.add('hero__frame-area--floating');
        });

      if (!prefersReduced) {
        el.querySelectorAll<HTMLElement>('.hero__front-sparkle').forEach((node, i) => {
          const sparkle = FRONT_SPARKLES[i];
          gsap.fromTo(node,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.5, delay: 1.8 + (sparkle?.delay ?? 0) * 0.3, ease: 'back.out(2)' },
          );
          gsap.to(node, {
            opacity: 0.2, scale: 0.6,
            duration: gsap.utils.random(2, 3.5), delay: 3 + (sparkle?.delay ?? 0),
            ease: 'sine.inOut', repeat: -1, yoyo: true,
          });
        });
      }
    }, el);

    window.addEventListener('mousemove', onMouseMove);
    return () => { ctx.revert(); window.removeEventListener('mousemove', onMouseMove); };
  }, [onMouseMove]);

  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="hero" id="hero">
      <div className="hero__text">
        <span className="hero__label">{content.hero.name}</span>
        <h1 className="hero__title">{content.hero.brandName}</h1>
        <hr className="hero__divider" />
        <p className="hero__subtitle">{t(content.hero.title)}</p>
        <p className="hero__micro">{t(content.hero.micro)}</p>

        <div className="hero__actions">
          <a href={content.social.whatsapp} className="hero__cta hero__cta--primary" target="_blank" rel="noopener noreferrer">
            {t(content.hero.ctaPrimary)}
            <span className="hero__cta-arrow">→</span>
          </a>
          <button className="hero__cta hero__cta--secondary" type="button" onClick={scrollToWorks}>
            {t(content.hero.ctaSecondary)}
          </button>
        </div>

        <SocialLinks className="hero__social" />
      </div>

      <div className="hero__composition">
        <div ref={frameAreaRef} className="hero__frame-area">
          <div className="hero__aura" />
          <div className="hero__frame" />
          <div className="hero__character-wrap">
            <img src="/assets/hero/personagem.png" alt="Personagem ilustrada" className="hero__character-img" draggable={false} />
          </div>
          {FRONT_SPARKLES.map((s, i) => (
            <div key={i} className="hero__front-sparkle" style={{ left: s.x, top: s.y, opacity: 0 }}>
              <Sparkle size={s.size} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
