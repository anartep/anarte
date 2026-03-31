import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './StarCursor.css';

const TRAIL_SIZE = 28;
const STAR_SVG = `<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12,0 L13.2,9.2 L24,12 L13.2,14.8 L12,24 L10.8,14.8 L0,12 L10.8,9.2 Z"/></svg>`;
const TRAIL_SVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12,0 L13.2,9.2 L24,12 L13.2,14.8 L12,24 L10.8,14.8 L0,12 L10.8,9.2 Z"/></svg>`;

export function StarCursor() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cursor = document.createElement('div');
    cursor.className = 'star-cursor';
    cursor.innerHTML = STAR_SVG;
    document.body.appendChild(cursor);

    const trailContainer = document.createElement('div');
    trailContainer.className = 'star-trail';
    document.body.appendChild(trailContainer);

    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_SIZE; i++) {
      const p = document.createElement('div');
      p.className = 'star-trail__particle';
      p.innerHTML = TRAIL_SVG;
      trailContainer.appendChild(p);
      pool.push(p);
    }

    let idx = 0;
    let lastTime = 0;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const now = performance.now();
      if (now - lastTime < 30) return;
      lastTime = now;

      const p = pool[idx % TRAIL_SIZE];
      idx++;

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
        x: e.clientX, y: e.clientY,
        xPercent: -50, yPercent: -50,
        scale: 1,
        opacity: 0.7 + Math.random() * 0.3,
        rotation: Math.random() * 360,
      });
      gsap.to(p, {
        x: e.clientX + driftX, y: e.clientY + driftY,
        scale: 0, opacity: 0, rotation: '+=90',
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      cursor.style.left = '-200px';
      cursor.style.top = '-200px';
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cursor.remove();
      trailContainer.remove();
    };
  }, []);

  return null;
}
