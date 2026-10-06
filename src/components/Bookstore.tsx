import { useLang, useOverlay } from '../context';
import { bookstore } from '../data/content';
import { Sparkle } from './Icons';
import desafiando from '../assets/bookstore/livraria-desafiando.webp';
import thomasNelson from '../assets/bookstore/livraria-thomas-nelson.webp';
import ouviDizer from '../assets/bookstore/livraria-ouvi-dizer.webp';
import atena from '../assets/bookstore/livraria-atena.webp';
import './Bookstore.css';

const photos: Record<string, string> = { desafiando, 'thomas-nelson': thomasNelson, 'ouvi-dizer': ouviDizer, atena };

/** Small strip of polaroid photos of the books in bookstores. Click opens the project when there is one. */
export function Bookstore() {
  const { t } = useLang();
  const { openProjects } = useOverlay();
  return (
    <section className="bookstore" aria-label={t(bookstore.label)}>
      <div className="container bookstore__inner">
        <p className="eyebrow bookstore__label" data-reveal><Sparkle /> {t(bookstore.label)}</p>
        <ul className="polaroids">
          {bookstore.items.map((b, i) => {
            const inner = (
              <>
                <span className="polaroid__tape" aria-hidden="true" />
                <span className="polaroid__photo">
                  <img src={photos[b.id]} alt={b.project ? '' : b.title} loading="lazy" decoding="async" />
                </span>
                <span className="polaroid__caption">{b.title}</span>
              </>
            );
            return (
              <li key={b.id} style={{ ['--i' as string]: i }} data-reveal>
                {b.project ? (
                  <button type="button" className="polaroid polaroid--link" onClick={() => openProjects({ slug: b.project })} aria-label={b.title}>{inner}</button>
                ) : (
                  <figure className="polaroid">{inner}</figure>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
