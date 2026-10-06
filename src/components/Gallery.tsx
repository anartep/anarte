import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang, useOverlay } from '../context';
import { gallery } from '../data/content';
import { useFocusTrap, useLockScroll, useReducedMotion } from '../hooks';
import { Arrow, Close, Sparkle } from './Icons';
import './Gallery.css';

// small (polaroid) + large (lightbox) versions of every photo
const small = import.meta.glob('../assets/gallery/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const src = (id: string, lg = false) => small[`../assets/gallery/${id}${lg ? '-lg' : ''}.webp`];

const N = gallery.items.length;

/**
 * "Varal": polaroids pinned on a line that slowly glides left → right.
 * Hover pauses, drag/swipe scrolls, click opens the photo large.
 */
export function Gallery() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const moved = useRef(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const vp = viewportRef.current;
    const track = trackRef.current;
    if (!vp || !track || reduced) return;
    const group = track.firstElementChild as HTMLElement;
    let W = group.offsetWidth;
    let x = -W, speed = 34, target = 34, raf = 0, last = performance.now();
    let hovering = false, dragging = false, startX = 0, startPos = 0, visible = true;
    const ro = new ResizeObserver(() => { W = group.offsetWidth; });
    ro.observe(group);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(vp);
    const wrap = () => { while (x >= 0) x -= W; while (x < -W) x += W; };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging && visible) {
        target = hovering ? 0 : 34;
        speed += (target - speed) * Math.min(1, dt * 4);
        x += speed * dt;
        wrap();
      }
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true; startX = e.clientX; startPos = x; moved.current = 0;
      vp.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      moved.current = Math.max(moved.current, Math.abs(dx));
      x = startPos + dx; wrap();
      if (moved.current > 6) vp.classList.add('is-dragging');
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      vp.classList.remove('is-dragging');
      try { vp.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      if (moved.current <= 6) {
        const el = (document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null)?.closest<HTMLElement>('[data-photo]');
        if (el) setOpen(Number(el.dataset.photo));
      }
    };
    const enter = () => { hovering = true; };
    const leave = () => { hovering = false; };
    vp.addEventListener('pointerdown', down);
    vp.addEventListener('pointermove', move);
    vp.addEventListener('pointerup', up);
    vp.addEventListener('pointercancel', up);
    vp.addEventListener('pointerenter', enter);
    vp.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      vp.removeEventListener('pointerdown', down);
      vp.removeEventListener('pointermove', move);
      vp.removeEventListener('pointerup', up);
      vp.removeEventListener('pointercancel', up);
      vp.removeEventListener('pointerenter', enter);
      vp.removeEventListener('pointerleave', leave);
    };
  }, [reduced]);

  const group = (copy: number) => (
    <ul className="varal__group" aria-hidden={copy > 0}>
      {gallery.items.map((g, i) => (
        <li key={g.id} style={{ ['--i' as string]: i }}>
          <button
            type="button"
            className="snap"
            data-photo={i}
            tabIndex={copy > 0 ? -1 : 0}
            aria-label={t(g.title)}
            onClick={(e) => { if (e.detail === 0 || reduced) setOpen(i); }}
          >
            <span className="snap__peg" aria-hidden="true" />
            <span className="snap__photo">
              <img src={src(g.id)} alt="" width={400} height={500} loading="lazy" decoding="async" draggable={false} />
            </span>
            <span className="snap__caption">{t(g.title)}</span>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="gallery" id="galeria" aria-label={t(gallery.label)}>
      <div className="container gallery__head">
        <p className="eyebrow" data-reveal><Sparkle /> {t(gallery.label)}</p>
        <p className="sec-head__hint" data-reveal style={{ ['--d' as string]: '.06s' }}>
          <span className="hint--mouse">{t(gallery.hint)}</span>
          <span className="hint--touch">{t(gallery.hintTouch)}</span>
        </p>
      </div>
      <div className={`varal ${reduced ? 'is-static' : ''}`} ref={viewportRef} data-reveal>
        <span className="varal__line" aria-hidden="true" />
        <div className="varal__track" ref={trackRef}>
          {group(0)}
          {!reduced && group(1)}
        </div>
      </div>
      <Lightbox index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

function Lightbox({ index, onClose, onIndex }: { index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useLang();
  const { openProjects } = useOverlay();
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;
  useLockScroll(isOpen);
  useFocusTrap(ref, isOpen, onClose);

  const go = useCallback((d: number) => { if (index !== null) onIndex((index + d + N) % N); }, [index, onIndex]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, go]);

  if (index === null) return null;
  const g = gallery.items[index];
  return (
    <div className="lightbox" ref={ref} role="dialog" aria-modal="true" aria-label={t(g.title)} onClick={onClose}>
      <figure className="lightbox__card" key={g.id} onClick={(e) => e.stopPropagation()}>
        <img src={src(g.id, true)} alt={t(g.title)} />
        <figcaption>
          <span className="lightbox__title">{t(g.title)}</span>
          {g.project && (
            <button type="button" className="btn quote-btn lightbox__project" onClick={() => { onClose(); openProjects({ slug: g.project }); }}>
              {t(gallery.open)} <Arrow dir="upright" />
            </button>
          )}
        </figcaption>
      </figure>
      <button type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label={t({ pt: 'Fechar', en: 'Close' })} data-autofocus><Close /></button>
      <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t(gallery.prev)}><Arrow dir="left" /></button>
      <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t(gallery.next)}><Arrow /></button>
      <p className="lightbox__count">{index + 1} / {N}</p>
    </div>
  );
}
