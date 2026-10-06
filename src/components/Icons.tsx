import type { SVGProps } from 'react';
import { SIGNATURE, PUBLISHER_MARKS } from '../data/marks';

type P = SVGProps<SVGSVGElement>;

/** 4-point sparkle used across the site (same shape as the stars in her art) */
export const Sparkle = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M12 0c.6 5.6 1.7 9.6 3.1 10.9 1.4 1.3 4.9 2.2 8.9 1.1-4 .9-7.5 1.8-8.9 3.1C13.7 16.4 12.6 19.4 12 24c-.6-4.6-1.7-7.6-3.1-8.9C7.5 13.8 4 12.9 0 12c4 1.1 7.5.2 8.9-1.1C10.3 9.6 11.4 5.6 12 0Z" />
  </svg>
);

export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="m3.5 7 8.5 6.2L20.5 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z" />
  </svg>
);

export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

export const Behance = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M6.94 4.5c.7 0 1.34.06 1.92.19.58.13 1.07.33 1.49.61.41.28.73.65.96 1.12.22.47.34 1.05.34 1.73 0 .74-.17 1.36-.51 1.86-.34.5-.84.9-1.5 1.22.91.26 1.58.72 2.02 1.37.45.66.67 1.45.67 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.66 1-1.12 1.35-.47.35-1.01.6-1.63.77-.61.17-1.26.25-1.94.25H0V4.5h6.94Zm-.36 5.99c.56 0 1.01-.15 1.36-.45.35-.31.53-.72.53-1.27 0-.31-.06-.57-.17-.78a1.35 1.35 0 0 0-.46-.5 1.8 1.8 0 0 0-.66-.27 4.2 4.2 0 0 0-.78-.08H3.37v3.35h3.21Zm.19 6.31c.31 0 .6-.03.88-.1.28-.07.52-.18.73-.34.2-.16.36-.37.48-.64.12-.27.18-.6.18-1 0-.79-.22-1.36-.66-1.7-.44-.35-1.01-.52-1.73-.52H3.37v4.32h3.4ZM15.06 4.19h5.96v1.58h-5.96V4.19Zm7.08 6.91c-.2-.57-.48-1.05-.85-1.46a3.75 3.75 0 0 0-1.33-.95 4.26 4.26 0 0 0-1.73-.35c-.63 0-1.2.12-1.72.35-.51.23-.95.55-1.33.95-.37.41-.66.89-.85 1.46-.2.57-.3 1.19-.3 1.85 0 .66.1 1.28.3 1.85.2.57.48 1.06.86 1.47.37.41.82.73 1.33.96.51.23 1.08.35 1.71.35.95 0 1.72-.26 2.33-.79.6-.53 1-1.3 1.18-2.29h-3.19c-.07.42-.26.75-.55.98-.3.23-.67.35-1.11.35-.65 0-1.14-.2-1.48-.6-.33-.41-.52-.97-.54-1.7h7.05c.02-.15.03-.3.03-.46 0-.66-.1-1.28-.3-1.85v.03Zm-6.96 1.3c.06-.65.26-1.16.61-1.53.35-.37.83-.55 1.42-.55.29 0 .56.05.8.16.24.1.44.25.61.44.17.19.3.41.39.67.09.26.14.53.15.82h-3.98v-.01Z" />
  </svg>
);

export const Sun = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="4.4" fill="currentColor" />
    {Array.from({ length: 8 }).map((_, i) => (
      <path key={i} d="M12 1.8v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 45} 12 12)`} />
    ))}
  </svg>
);

export const Moon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M20.3 14.6A8.6 8.6 0 0 1 9.4 3.7 8.8 8.8 0 1 0 20.3 14.6Z" />
    <path fill="currentColor" d="M17.5 3.5c.2 1.5.5 2.3.9 2.6.4.4 1.2.6 2.6.8-1.4.2-2.2.5-2.6.8-.4.4-.7 1.2-.9 2.6-.2-1.4-.5-2.2-.9-2.6-.4-.3-1.2-.6-2.6-.8 1.4-.2 2.2-.4 2.6-.8.4-.3.7-1.1.9-2.6Z" />
  </svg>
);

export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const Arrow = ({ dir = 'right', ...p }: P & { dir?: 'left' | 'right' | 'up' | 'down' | 'upright' }) => {
  const rot = { right: 0, down: 90, left: 180, up: -90, upright: -45 }[dir];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p} style={{ transform: `rotate(${rot}deg)`, ...(p.style || {}) }}>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Grid = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    {[3, 13].map((x) => [3, 13].map((y) => <rect key={`${x}${y}`} x={x} y={y} width="8" height="8" rx="2.2" fill="currentColor" />))}
  </svg>
);

export const Question = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M8.6 8.4a3.5 3.5 0 1 1 5.3 3c-1.1.7-1.9 1.4-1.9 2.8v.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

/** The ANA/RTE stamp signature, vectorised from her artwork. */
export const Signature = ({ title = 'Anarte', ...p }: P & { title?: string }) => (
  <svg viewBox={SIGNATURE.viewBox} role="img" aria-label={title} {...p}>
    <path fill="currentColor" fillRule="evenodd" d={SIGNATURE.d} />
  </svg>
);

export const PublisherMark = ({ id, ...p }: P & { id: string }) => {
  const m = PUBLISHER_MARKS[id];
  if (!m) return null;
  return (
    <svg viewBox={m.viewBox} aria-hidden="true" {...p}>
      <path fill="currentColor" fillRule="evenodd" d={m.d} />
    </svg>
  );
};

export const socialIcons = { Instagram, Mail, WhatsApp, LinkedIn, Behance };
