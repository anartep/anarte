import { useLang, useOverlay } from '../context';
import { bookstore } from '../data/content';
import { Sparkle } from './Icons';
import inverno from '../assets/bookstore/livraria-inverno.webp';
import thomasNelson from '../assets/bookstore/livraria-thomas-nelson.webp';
import atena from '../assets/bookstore/livraria-atena.webp';
import './Bookstore.css';

const photos: Record<string, string> = { inverno, 'thomas-nelson': thomasNelson, atena };

/** Small strip of polaroid photos of the books on bookstore shelves. */
export function Bookstore() {
  const { t } = useLang();
  const { openProjects } = useOverlay();
  return (
    <section className="bookstore" aria-label={t(bookstore.label)}>
      <div className="container bookstore__inner">
        <p className="eyebrow bookstore__label" data-reveal><Sparkle /> {t(bookstore.label)}</p>
        <ul className="polaroids">
          {bookstore.items.map((b, i) => (
            <li key={b.id} style={{ ['--i' as string]: i }} data-reveal>
              <button type="button" className="polaroid" onClick={() => openProjects({ slug: b.project })} aria-label={b.title}>
                <span className="polaroid__tape" aria-hidden="true" />
                <span className="polaroid__photo">
                  <img src={photos[b.id]} alt="" width={560} height={700} loading="lazy" decoding="async" />
                </span>
                <span className="polaroid__caption">{b.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
