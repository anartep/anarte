import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLang, useOverlay } from '../context';
import { works } from '../data/content';
import { projects } from '../data/projects';
import { useReducedMotion } from '../hooks';
import { Arrow, Grid, Sparkle } from './Icons';
import './Works.css';

const N = works.items.length;
const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Rotating 3D ring of the six featured pieces (reference: raylastudio.com).
 * Auto-advances, can be dragged/swiped, arrows/keyboard, click the front card to open the project.
 */
export function Works() {
  const { t } = useLang();
  const { openProjects } = useOverlay();
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const state = useRef({ r: 0, target: 0, dragging: false, startX: 0, startR: 0, moved: 0, lastX: 0, lastT: 0, vel: 0, idleUntil: 0, hover: false, visible: true });
  const [front, setFront] = useState(0);

  const goTo = useCallback((target: number) => {
    const s = state.current;
    s.target = target;
    s.idleUntil = performance.now() + 5000;
  }, []);

  const step = useCallback((dir: 1 | -1) => goTo(Math.round(state.current.target) - dir), [goTo]);

  const openWork = useCallback((i: number) => {
    const w = works.items[i];
    if (w.project) openProjects({ slug: w.project });
    else openProjects({ slug: `destaque-${w.slug}` });
  }, [openProjects]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const s = state.current;
    let raf = 0, last = performance.now(), nextAuto = performance.now() + 3200;
    let RX = 300, W = 300;

    const measure = () => {
      const sw = stage.clientWidth;
      const card = cardRefs.current[0];
      W = card ? card.offsetWidth : 300;
      RX = Math.min(sw / 2 - W * 0.3, W * 1.15);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; });
    io.observe(stage);

    // keyframes along the orbit, by distance |o| from the front slot:
    // front → sides → small cards peeking above at the back → hidden behind
    const KF = [
      { x: 0, y: 0, s: 1 },
      { x: 0.86, y: 0, s: 0.76 },
      { x: 0.5, y: -0.06, s: 0.54 },
      { x: 0, y: -0.08, s: 0.46 },
    ];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t * t * (3 - 2 * t);
    const layout = () => {
      let best = 0, bestA = 99;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = mod(i + s.r + N / 2, N) - N / 2; // (-N/2, N/2]
        const a = Math.min(3, Math.abs(o));
        const k0 = Math.floor(Math.min(2.999, a));
        const tt = ease(a - k0);
        const A = KF[k0], B = KF[k0 + 1];
        const x = Math.sign(o) * lerp(A.x, B.x, tt) * RX;
        const y = lerp(A.y, B.y, tt) * W;
        const sc = lerp(A.s, B.s, tt);
        const k = 1 - a / 3;
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), ${y.toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
        el.style.zIndex = String(Math.round(k * 100) + 10);
        el.style.setProperty('--shade', (0.55 * (1 - k)).toFixed(3));
        el.style.setProperty('--blur', `${((1 - k) * 1.4).toFixed(2)}px`);
        if (a < bestA) { bestA = a; best = i; }
      });
      return best;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!s.dragging) {
        if (!reduced && s.visible && !s.hover && now > s.idleUntil && now > nextAuto) {
          s.target = Math.round(s.target) - 1;
          nextAuto = now + 3400;
        }
        s.r += (s.target - s.r) * (1 - Math.exp(-dt * (reduced ? 30 : 5.5)));
      }
      const f = layout();
      setFront((prev) => (prev === f ? prev : f));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const spacing = () => Math.max(120, RX * 0.85);
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      s.dragging = true; s.startX = e.clientX; s.startR = s.r; s.moved = 0; s.lastX = e.clientX; s.lastT = performance.now(); s.vel = 0;
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.startX;
      s.moved = Math.max(s.moved, Math.abs(dx));
      s.r = s.startR + dx / spacing();
      const now = performance.now();
      const v = (e.clientX - s.lastX) / spacing() / Math.max(0.001, (now - s.lastT) / 1000);
      s.vel = s.vel * 0.7 + v * 0.3;
      s.lastX = e.clientX; s.lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.dragging = false;
      stage.classList.remove('is-dragging');
      try { stage.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      if (s.moved > 6) {
        s.target = Math.round(s.r + Math.max(-2, Math.min(2, s.vel * 0.22)));
        s.idleUntil = performance.now() + 5000;
      } else {
        // treat as click on the card under the pointer
        const el = (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null)?.closest<HTMLElement>('[data-card]');
        if (el) {
          const i = Number(el.dataset.card);
          const cur = mod(Math.round(-s.target), N);
          if (i === cur) openWork(i);
          else {
            let d = mod(i - cur, N);
            if (d > N / 2) d -= N;
            goTo(Math.round(s.target) - d);
          }
        }
      }
    };
    const onEnter = () => { s.hover = true; };
    const onLeave = () => { s.hover = false; };
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('pointerenter', onEnter);
    stage.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('pointerenter', onEnter);
      stage.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, goTo, openWork]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openWork(front); }
  };

  const cur = works.items[front];

  return (
    <section className="works" id="trabalhos" aria-labelledby="works-title">
      <div className="container">
        <header className="sec-head">
          <p className="eyebrow" data-reveal><Sparkle /> {t(works.label)}</p>
          <h2 className="section-title" id="works-title" data-reveal style={{ ['--d' as string]: '.06s' }}>{t(works.title)}</h2>
          <p className="sec-head__hint" data-reveal style={{ ['--d' as string]: '.12s' }}>{t(works.hint)}</p>
        </header>
      </div>

      <div
        className="ring"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-roledescription="carrossel"
        aria-label={t(works.title)}
        onKeyDown={onKey}
        onFocus={() => { state.current.hover = true; }}
        onBlur={() => { state.current.hover = false; }}
        data-reveal
      >
        <div className="ring__floor" aria-hidden="true" />
        {works.items.map((w, i) => (
          <button
            key={w.slug}
            type="button"
            className={`ring__card ${i === front ? 'is-front' : ''}`}
            data-card={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            tabIndex={-1}
            aria-label={`${t(w.title)} — ${t(w.meta)}`}
            onClick={(e) => e.preventDefault()}
          >
            <img src={w.image} alt="" draggable={false} loading={i < 3 ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: w.focus }} />
            <span className="ring__open" aria-hidden="true"><Arrow dir="upright" /></span>
          </button>
        ))}
      </div>

      <div className="container works__bar">
        <button type="button" className="round-btn" onClick={() => step(-1)} aria-label={t(works.prev)}><Arrow dir="left" /></button>
        <div className="works__caption" aria-live="polite">
          <p className="works__title" key={`t-${front}`}>{t(cur.title)}</p>
          <p className="works__meta" key={`m-${front}`}>{t(cur.meta)}</p>
          <div className="works__dots" aria-hidden="true">
            {works.items.map((w, i) => <i key={w.slug} className={i === front ? 'is-on' : ''} />)}
          </div>
        </div>
        <button type="button" className="round-btn" onClick={() => step(1)} aria-label={t(works.next)}><Arrow /></button>
      </div>

      <div className="works__all" data-reveal>
        <button type="button" className="btn btn--big" onClick={() => openProjects()}>
          <Grid />
          <span>{t(works.seeAll)}</span>
          <span className="btn__count">{projects.length}</span>
        </button>
      </div>
    </section>
  );
}
