import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLang, useOverlay } from '../context';
import { allProjects, works } from '../data/content';
import { categories, projectImg, projects, type Project } from '../data/projects';
import { useFocusTrap, useLockScroll } from '../hooks';
import { Arrow, Behance, Close, Sparkle } from './Icons';
import './ProjectsPanel.css';

interface ViewProject {
  slug: string;
  title: Project['title'];
  client?: string;
  category: Project['category'];
  behance?: string;
  images: { src: string; w: number; h: number }[];
}

const coverSrc = (p: Project) => `${import.meta.env.BASE_URL}projects/${p.id}/cover.webp`;

function toView(slug: string): ViewProject | null {
  const p = projects.find((x) => x.slug === slug);
  if (p) {
    return { slug: p.slug, title: p.title, client: p.client, category: p.category, behance: p.behance, images: p.images.map((im) => ({ src: projectImg(p, im.file), w: im.w, h: im.h })) };
  }
  if (slug.startsWith('destaque-')) {
    const w = works.items.find((x) => `destaque-${x.slug}` === slug);
    if (w) return { slug, title: w.title, category: 'personal', images: [{ src: w.image, w: 589, h: 799 }] };
  }
  return null;
}

function Img({ src, w, h, alt, onClick }: { src: string; w: number; h: number; alt: string; onClick?: () => void }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button type="button" className={`pimg ${loaded ? 'is-loaded' : ''}`} style={{ aspectRatio: `${w} / ${h}` }} onClick={onClick} aria-label={alt}>
      <img src={src} width={w} height={h} alt="" loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
    </button>
  );
}

export function ProjectsPanel() {
  const { t } = useLang();
  const { projectsOpen, projectSlug, projectFilter, setProjectFilter, closeProjects, setProjectSlug } = useOverlay();
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const [mounted, setMounted] = useState(projectsOpen);

  useLockScroll(projectsOpen);

  useEffect(() => {
    if (projectsOpen) setMounted(true);
    else {
      const tm = window.setTimeout(() => setMounted(false), 500);
      return () => window.clearTimeout(tm);
    }
  }, [projectsOpen]);

  const view = useMemo(() => (projectSlug ? toView(projectSlug) : null), [projectSlug]);

  useEffect(() => { bodyRef.current?.scrollTo({ top: 0 }); setZoom(null); }, [projectSlug]);

  const onEscape = useCallback(() => {
    if (zoom !== null) setZoom(null);
    else if (projectSlug) setProjectSlug(null);
    else closeProjects();
  }, [zoom, projectSlug, setProjectSlug, closeProjects]);
  useFocusTrap(panelRef, projectsOpen, onEscape);

  const list = projectFilter === 'all' ? projects : projects.filter((p) => p.category === projectFilter);
  const catLabel = (id: string) => t(categories.find((c) => c.id === id)?.label ?? { pt: '', en: '' });

  // prev / next project inside the panel
  const idx = view ? projects.findIndex((p) => p.slug === view.slug) : -1;
  const prev = idx >= 0 ? projects[(idx - 1 + projects.length) % projects.length] : null;
  const next = idx >= 0 ? projects[(idx + 1) % projects.length] : null;

  // keyboard arrows inside the zoom view
  useEffect(() => {
    if (zoom === null || !view) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setZoom((z) => (z === null ? z : (z + 1) % view.images.length));
      if (e.key === 'ArrowLeft') setZoom((z) => (z === null ? z : (z - 1 + view.images.length) % view.images.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, view]);

  if (!mounted) return null;

  return (
    <div className={`panel-root ${projectsOpen ? 'is-open' : ''}`}>
      <div className="panel-scrim" onClick={closeProjects} aria-hidden="true" />
      <div className="panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="panel-title">
        <header className="panel__head">
          <div className="panel__heading">
            <p className="eyebrow"><Sparkle /> Behance · {projects.length}</p>
            <h2 className="panel__title" id="panel-title">{t(allProjects.title)}</h2>
          </div>
          <button type="button" className="panel__close" onClick={closeProjects} aria-label={t({ pt: 'Fechar', en: 'Close' })} data-autofocus>
            <Close />
          </button>
        </header>

        <div className="panel__body" ref={bodyRef}>
          {!view && (
            <div className="pgrid-wrap" key="grid">
              <p className="panel__sub">{t(allProjects.subtitle)}</p>
              <div className="chips" role="group" aria-label="Filtro">
                {categories.map((c) => {
                  const n = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length;
                  return (
                    <button key={c.id} type="button" className="chip" aria-pressed={projectFilter === c.id} onClick={() => setProjectFilter(c.id)}>
                      {t(c.label)} <span>{n}</span>
                    </button>
                  );
                })}
              </div>
              <ul className="pgrid">
                {list.map((p, i) => (
                  <li key={p.slug} style={{ ['--i' as string]: i }}>
                    <button type="button" className="pcard" onClick={() => setProjectSlug(p.slug)}>
                      <span className="pcard__img">
                        <img src={coverSrc(p)} alt="" loading="lazy" decoding="async" width={p.cover.w} height={p.cover.h} />
                        <span className="pcard__hover"><Arrow dir="upright" /> {t(allProjects.view)}</span>
                      </span>
                      <span className="pcard__title">{t(p.title)}</span>
                      <span className="pcard__meta">
                        {[p.client, catLabel(p.category)].filter(Boolean).join(' · ')} · {p.images.length} {t(allProjects.images)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {list.length === 0 && <p className="panel__empty">{t(allProjects.empty)}</p>}
            </div>
          )}

          {view && (
            <article className="pdetail" key={view.slug}>
              <button type="button" className="pdetail__back" onClick={() => setProjectSlug(null)}>
                <Arrow dir="left" /> {t(allProjects.back)}
              </button>
              <header className="pdetail__head">
                <p className="eyebrow"><Sparkle /> {catLabel(view.category)}</p>
                <h3 className="pdetail__title">{t(view.title)}</h3>
                {view.client && <p className="pdetail__client">{view.client}</p>}
                <div className="pdetail__links">
                  {view.behance && (
                    <a className="btn btn--ghost pdetail__behance" href={view.behance} target="_blank" rel="noopener noreferrer">
                      <Behance /> {t(allProjects.behance)}
                    </a>
                  )}
                  <span className="pdetail__hint">{t(allProjects.zoomHint)}</span>
                </div>
              </header>
              <div className="pdetail__images">
                {view.images.map((im, i) => (
                  <Img key={im.src} src={im.src} w={im.w} h={im.h} alt={`${t(view.title)} — ${i + 1}/${view.images.length}`} onClick={() => setZoom(i)} />
                ))}
              </div>
              {prev && next && (
                <nav className="pdetail__nav" aria-label="Projetos">
                  <button type="button" onClick={() => setProjectSlug(prev.slug)}>
                    <span className="pdetail__nav-label"><Arrow dir="left" /> {t(allProjects.prevProject)}</span>
                    <span className="pdetail__nav-title">{t(prev.title)}</span>
                  </button>
                  <button type="button" onClick={() => setProjectSlug(next.slug)}>
                    <span className="pdetail__nav-label">{t(allProjects.nextProject)} <Arrow /></span>
                    <span className="pdetail__nav-title">{t(next.title)}</span>
                  </button>
                </nav>
              )}
            </article>
          )}
        </div>

        {view && zoom !== null && (
          <div className="zoom" role="dialog" aria-label={t(view.title)} onClick={() => setZoom(null)}>
            <img src={view.images[zoom].src} alt={`${t(view.title)} — ${zoom + 1}/${view.images.length}`} onClick={(e) => e.stopPropagation()} />
            <button type="button" className="zoom__close" onClick={() => setZoom(null)} aria-label={t({ pt: 'Fechar', en: 'Close' })}><Close /></button>
            {view.images.length > 1 && (
              <>
                <button type="button" className="zoom__nav zoom__nav--prev" aria-label="←" onClick={(e) => { e.stopPropagation(); setZoom((zoom - 1 + view.images.length) % view.images.length); }}><Arrow dir="left" /></button>
                <button type="button" className="zoom__nav zoom__nav--next" aria-label="→" onClick={(e) => { e.stopPropagation(); setZoom((zoom + 1) % view.images.length); }}><Arrow /></button>
              </>
            )}
            <p className="zoom__count">{zoom + 1} / {view.images.length}</p>
          </div>
        )}
      </div>
    </div>
  );
}
