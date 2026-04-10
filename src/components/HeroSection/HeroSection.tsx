'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SocialLinks } from '../shared/SocialLinks';
import './HeroSection.css';

export function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!artRef.current) return;
    const xF = (e.clientX / window.innerWidth - 0.5) * 2;
    const yF = (e.clientY / window.innerHeight - 0.5) * 2;

    const charImg = artRef.current.querySelector('.hero__character-img');
    if (charImg) {
      gsap.to(charImg, {
        x: xF * 8, y: yF * 6, duration: 1.4, ease: 'power2.out', overwrite: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });

      tl.fromTo('.hero__character-img', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.4 })
        .fromTo('.hero__text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.7')
        .fromTo('.hero__label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.2')
        .fromTo('.hero__title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
        .fromTo('.hero__divider', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, transformOrigin: 'left' }, '-=0.5')
        .fromTo('.hero__subtitle', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('.hero__actions', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero__social', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');
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

        <div className="hero__actions">
          <a href={content.social.whatsapp} className="hero__cta hero__cta--primary" target="_blank" rel="noopener noreferrer">
            {t(content.hero.ctaPrimary)}
          </a>
          <button className="hero__cta hero__cta--secondary" type="button" onClick={scrollToWorks}>
            {t(content.hero.ctaSecondary)}
          </button>
        </div>

        <SocialLinks className="hero__social" />
      </div>

      <div ref={artRef} className="hero__art">
        <div className="hero__glow" />
        <img
          src={`${import.meta.env.BASE_URL}assets/hero/personagem.png`}
          alt="Personagem ilustrada"
          className="hero__character-img"
          draggable={false}
        />
      </div>
    </section>
  );
}

export default HeroSection;
