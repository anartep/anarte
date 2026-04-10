import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './Services.css';

const ICONS: Record<string, React.ReactNode> = {
  book: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  ),
  character: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  editorial: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

export function Services() {
  const { t } = useLang();

  return (
    <section className="services" id="services">
      <SectionHeader title={content.services.sectionTitle} />

      <div className="services__grid">
        {content.services.blocks.map((block) => (
          <div key={block.icon} className="services__block" data-reveal>
            <div className="services__icon">
              {ICONS[block.icon]}
            </div>
            <h3 className="services__block-title">{t(block.title)}</h3>
            <p className="services__block-desc">{t(block.description)}</p>
            <a
              href={content.social.whatsapp}
              className="services__block-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t({ pt: 'Solicitar →', en: 'Request →' })}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
