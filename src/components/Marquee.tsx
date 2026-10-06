import { useEffect, useRef } from 'react';
import { useLang, useOverlay } from '../context';
import { marquee } from '../data/content';
import { useReducedMotion } from '../hooks';
import { Sparkle } from './Icons';
import './Marquee.css';

/** Yellow band — items glide left → right; hover slows it down, scrolling speeds it up. */
export function Marquee() {
  const { t, lang } = useLang();
  const { openProjects } = useOverlay();
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const group = track.firstElementChild as HTMLElement;
    let W = group.offsetWidth;
    let x = -W;
    let speed = 70, target = 70, boost = 0;
    let lastY = window.scrollY, raf = 0, last = performance.now();
    let hovering = false;

    const ro = new ResizeObserver(() => { W = group.offsetWidth; });
    ro.observe(group);
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      boost = Math.min(900, boost + Math.abs(dy) * 6);
    };
    const enter = () => { hovering = true; };
    const leave = () => { hovering = false; };
    track.addEventListener('pointerenter', enter);
    track.addEventListener('pointerleave', leave);
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      target = hovering ? 14 : 70;
      speed += (target - speed) * Math.min(1, dt * 4);
      boost *= Math.pow(0.04, dt);
      x += (speed + boost) * dt;
      if (x >= 0) x -= W;
      const skew = Math.min(8, boost / 80);
      track.style.transform = `translate3d(${x}px,0,0) skewX(${-skew}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      track.removeEventListener('pointerenter', enter);
      track.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reduced, lang]);

  const group = (copy: number) => (
    <div className="marquee__group" aria-hidden={copy > 0}>
      {[0, 1].map((rep) =>
        marquee.map((m, i) => (
          <span className="marquee__item" key={`${rep}-${i}`}>
            <button
              type="button"
              className="marquee__label"
              tabIndex={copy > 0 || rep > 0 ? -1 : 0}
              onClick={() => openProjects({ filter: m.category })}
            >
              {t(m.label)}
            </button>
            <Sparkle className="marquee__star" />
          </span>
        )),
      )}
    </div>
  );

  return (
    <div className="marquee" role="region" aria-label={marquee.map((m) => t(m.label)).join(', ')}>
      <div className="marquee__track" ref={trackRef}>
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
