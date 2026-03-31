'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import './CosmicBackground.css';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CosmicBackgroundProps {
  starCount?: number;
  particleCount?: number;
  className?: string;
}

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

/* ------------------------------------------------------------------ */
/*  PRNG                                                               */
/* ------------------------------------------------------------------ */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function makeStars(n: number): StarData[] {
  const r = seeded(42);
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 100,
    y: r() * 100,
    size: r() * 28 + 8,
    opacity: r() * 0.4 + 0.6,
    twinkleDuration: r() * 3 + 2,
    twinkleDelay: r() * 8,
  }));
}

function makeParticles(n: number): ParticleData[] {
  const r = seeded(137);
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: r() * 100,
    y: r() * 100,
    size: r() * 2 + 1,
    opacity: r() * 0.5 + 0.2,
  }));
}

/* ------------------------------------------------------------------ */
/*  Four-point sparkle star                                            */
/* ------------------------------------------------------------------ */

function FourPointStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12,0 L13.2,9.2 L24,12 L13.2,14.8 L12,24 L10.8,14.8 L0,12 L10.8,9.2 Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const TRAIL_POOL_SIZE = 28;
const SHOOTING_STAR_COUNT = 2;

export function CosmicBackground({
  starCount = 10,
  particleCount = 30,
  className = '',
}: CosmicBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const starCursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const trailIdx = useRef(0);
  const lastTrailTime = useRef(0);
  const shootingRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => makeStars(starCount), [starCount]);
  const particles = useMemo(() => makeParticles(particleCount), [particleCount]);

  /* ---- Mouse handler --------------------------------------------- */

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    /* Star cursor — instant follow via left/top to avoid conflicting with CSS transform */
    if (starCursorRef.current) {
      starCursorRef.current.style.left = `${e.clientX}px`;
      starCursorRef.current.style.top = `${e.clientY}px`;
    }

    /* Trail — spawn a particle every ~30ms */
    const now = performance.now();
    if (trailRef.current && now - lastTrailTime.current > 30) {
      lastTrailTime.current = now;
      const pool = trailRef.current.children;
      const idx = trailIdx.current % TRAIL_POOL_SIZE;
      const p = pool[idx] as HTMLElement | undefined;
      if (p) {
        gsap.killTweensOf(p);
        const driftX = (Math.random() - 0.5) * 30;
        const driftY = (Math.random() - 0.5) * 30 - 10;
        const size = Math.random() * 8 + 6;
        const svg = p.querySelector('svg');
        if (svg) {
          svg.setAttribute('width', String(size));
          svg.setAttribute('height', String(size));
        }
        gsap.set(p, {
          x: e.clientX,
          y: e.clientY,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 0.7 + Math.random() * 0.3,
          rotation: Math.random() * 360,
        });
        gsap.to(p, {
          x: e.clientX + driftX,
          y: e.clientY + driftY,
          scale: 0,
          opacity: 0,
          rotation: '+=90',
          duration: 0.6 + Math.random() * 0.4,
          ease: 'power2.out',
        });
      }
      trailIdx.current++;
    }

    /* Glow */
    if (cursorGlowRef.current) {
      gsap.to(cursorGlowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    /* Parallax */
    const xF = (e.clientX / window.innerWidth - 0.5) * 2;
    const yF = (e.clientY / window.innerHeight - 0.5) * 2;

    const nebulaWrap = ref.current.querySelector('[data-parallax="nebula"]');
    if (nebulaWrap) {
      gsap.to(nebulaWrap, {
        x: xF * 12,
        y: yF * 8,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    const starLayer = ref.current.querySelector('[data-parallax="stars"]');
    if (starLayer) {
      gsap.to(starLayer, {
        x: xF * 18,
        y: yF * 10,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  }, []);

  /* ---- GSAP animations ------------------------------------------- */

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      el.querySelectorAll<HTMLElement>('[data-star]').forEach((node, i) => {
        const s = stars[i];
        if (!s) return;
        gsap.to(node, {
          opacity: s.opacity * 0.4,
          scale: 0.8,
          duration: s.twinkleDuration + 2,
          delay: s.twinkleDelay,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      el.querySelectorAll<HTMLElement>('[data-particle]').forEach((node) => {
        gsap.to(node, {
          y: `-=${gsap.utils.random(15, 40)}`,
          x: `+=${gsap.utils.random(-12, 12)}`,
          opacity: 0,
          duration: gsap.utils.random(10, 20),
          delay: gsap.utils.random(0, 12),
          ease: 'none',
          repeat: -1,
          repeatRefresh: true,
        });
      });
    }, el);

    /* Shooting stars */
    let shootingTimers: ReturnType<typeof setTimeout>[] = [];

    if (!prefersReduced && shootingRef.current) {
      const shooters = shootingRef.current.querySelectorAll<HTMLElement>(
        '.cosmic-bg__shooting-star',
      );

      function launchStar(node: HTMLElement) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const fromLeft = Math.random() > 0.5;
        const startX = fromLeft
          ? -20
          : Math.random() * vw * 0.8 + vw * 0.1;
        const startY = fromLeft
          ? Math.random() * vh * 0.4
          : -20;
        const angle = fromLeft
          ? 15 + Math.random() * 15
          : 30 + Math.random() * 20;
        const distance = vw * 0.5 + Math.random() * vw * 0.3;
        const rad = (angle * Math.PI) / 180;
        const endX = startX + Math.cos(rad) * distance;
        const endY = startY + Math.sin(rad) * distance;
        const duration = 1.6 + Math.random() * 1.2;

        gsap.set(node, {
          x: startX,
          y: startY,
          rotation: angle,
          opacity: 0,
          scaleX: 0.5 + Math.random() * 0.5,
        });

        gsap.timeline()
          .to(node, { opacity: 0.5 + Math.random() * 0.3, duration: 0.15 })
          .to(node, { x: endX, y: endY, duration, ease: 'none' }, '<')
          .to(node, { opacity: 0, duration: 0.5 }, `-=${0.5}`);

        const next = 8000 + Math.random() * 12000;
        const t = setTimeout(() => launchStar(node), next);
        shootingTimers.push(t);
      }

      shooters.forEach((node, i) => {
        const initialDelay = 4000 + i * 6000 + Math.random() * 5000;
        const t = setTimeout(() => launchStar(node), initialDelay);
        shootingTimers.push(t);
      });
    }

    const onMouseLeave = () => {
      if (starCursorRef.current) {
        starCursorRef.current.style.left = '-200px';
        starCursorRef.current.style.top = '-200px';
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      ctx.revert();
      shootingTimers.forEach(clearTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [stars, onMouseMove]);

  /* ---- Render ---------------------------------------------------- */

  return (
    <>
      <div ref={ref} className={`cosmic-bg ${className}`}>
        <div className="cosmic-bg__base" />

        <div className="cosmic-bg__nebula-wrap" data-parallax="nebula">
          <img
            src="/assets/bg/nevoas.png"
            alt=""
            className="cosmic-bg__nebula-img"
            draggable={false}
          />
        </div>

        <div ref={shootingRef} className="cosmic-bg__shooting-stars">
          {Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => (
            <div key={i} className="cosmic-bg__shooting-star" />
          ))}
        </div>

        <div className="cosmic-bg__particles">
          {particles.map((p) => (
            <span
              key={p.id}
              data-particle
              className="cosmic-bg__particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>

        <div className="cosmic-bg__stars" data-parallax="stars">
          {stars.map((s) => (
            <div
              key={s.id}
              data-star
              className="cosmic-bg__star"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                opacity: s.opacity,
              }}
            >
              <FourPointStar size={s.size} />
            </div>
          ))}
        </div>

        <div ref={cursorGlowRef} className="cosmic-bg__cursor-glow" />
      </div>

      {/* Cursor & trail outside .cosmic-bg to escape z-index:-1 stacking context */}
      <div ref={starCursorRef} className="cosmic-bg__star-cursor">
        <FourPointStar size={30} />
      </div>

      <div ref={trailRef} className="cosmic-bg__trail">
        {Array.from({ length: TRAIL_POOL_SIZE }, (_, i) => (
          <div key={i} className="cosmic-bg__trail-particle">
            <FourPointStar size={10} />
          </div>
        ))}
      </div>
    </>
  );
}

export default CosmicBackground;
