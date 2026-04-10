import { content } from '../../data/content';
import { useLang } from '../../context/LanguageContext';
import { SectionHeader } from '../shared/SectionHeader';
import './Process.css';

export function Process() {
  const { t } = useLang();

  return (
    <section className="process" id="process">
      <SectionHeader title={content.process.sectionTitle} />

      <div className="process__flow">
        {content.process.steps.map((step, i) => (
          <div
            key={step.number}
            className={`process__entry ${i % 2 === 1 ? 'process__entry--offset' : ''} ${i === content.process.steps.length - 1 ? 'process__entry--final' : ''}`}
            data-reveal
          >
            <span className="process__num">
              {String(step.number).padStart(2, '0')}
            </span>
            <div className="process__entry-body">
              <h3 className="process__entry-title">{t(step.title)}</h3>
              <p className="process__entry-desc">{t(step.description)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
