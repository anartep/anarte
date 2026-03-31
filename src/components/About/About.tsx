import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './About.css';

export function About() {
  const { t } = useLang();
  const a = content.about;

  return (
    <section className="about" id="about">
      <SectionHeader title={a.sectionTitle} />

      <div className="about__content" data-reveal>
        <div className="about__info">
          <h3 className="about__name">{a.name}</h3>
          <span className="about__role">{t(a.role)}</span>

          <div className="about__meta">
            <span className="about__meta-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              {a.location}
            </span>
            <span className="about__meta-item about__meta-item--status">
              <span className="about__status-dot" />
              {t(a.status)}
            </span>
            <span className="about__meta-item">
              {t(a.statusSecondary)}
            </span>
          </div>

          <p className="about__bio">{t(a.bio)}</p>

          <div className="about__chips">
            {a.chips.map((chip, i) => (
              <span key={i} className="about__chip">{t(chip)}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
