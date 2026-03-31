import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './Process.css';

export function Process() {
  const { t } = useLang();

  return (
    <section className="process" id="process">
      <SectionHeader title={content.process.sectionTitle} />

      <div className="process__steps">
        {content.process.steps.map((step, i) => (
          <div key={step.number} className="process__step" data-reveal>
            <span className="process__number">
              {String(step.number).padStart(2, '0')}
            </span>
            <h3 className="process__step-title">{t(step.title)}</h3>
            <p className="process__step-desc">{t(step.description)}</p>
            {i < content.process.steps.length - 1 && (
              <div className="process__connector" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
