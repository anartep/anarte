import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './Services.css';

export function Services() {
  const { t } = useLang();

  return (
    <section className="services" id="services">
      <SectionHeader title={content.services.sectionTitle} />

      <div className="services__list">
        {content.services.blocks.map((block, i) => (
          <div key={block.icon} className="services__item" data-reveal>
            <span className="services__item-num">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="services__item-body">
              <h3 className="services__item-title">{t(block.title)}</h3>
              <p className="services__item-desc">{t(block.description)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="services__cta-wrap" data-reveal>
        <a
          href={content.social.whatsapp}
          className="services__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t({ pt: 'Solicitar orçamento →', en: 'Request a quote →' })}
        </a>
      </div>
    </section>
  );
}
